package cn.fan.neat.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.fan.neat.common.GlobalVal;
import cn.fan.neat.constant.ExceptionEnum;
import cn.fan.neat.entity.vo.PassRequest;
import cn.fan.neat.entity.po.UserEntity;
import cn.fan.neat.exception.BizException;
import cn.fan.neat.mapper.UserMapper;
import cn.fan.neat.service.UserService;
import cn.fan.neat.utils.RSAUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Value("${sa-token.public-key}")
    private String publicKey;

    @Value("${sa-token.private-key}")
    private String privateKey;

    @Value("${sa-token.init-username}")
    private String initUsername;

    @Value("${sa-token.init-password}")
    private String initPassword;

    @Value("${sa-token.init-mail}")
    private String initMail;

    @Value("${login.retry-times}")
    private Integer retryTimes;

    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public void update(UserEntity userEntity) {
        userMapper.updateByPrimaryKeySelective(userEntity);
    }

    @Override
    public void save(UserEntity userEntity) {
        String encryptedPass = RSAUtils.encrypt(publicKey, initPassword);
        userEntity.setPassword(encryptedPass);
        userEntity.setAvailable(1);
        Date nowDate = new Date();
        userEntity.setCtime(nowDate);
        userEntity.setMtime(nowDate);
        userMapper.insert(userEntity);
    }

    @Override
    public void changePass(PassRequest passRequest) {
        UserEntity user = userMapper.selectByPrimaryKey(passRequest.getUserId());
        if (user == null) {
            throw new BizException(ExceptionEnum.USER_NOT_FOUND);
        } else {
            String oldPass = RSAUtils.decrypt(privateKey, user.getPassword());
            String newPass = RSAUtils.decrypt(privateKey, passRequest.getOldPass());
            if (!oldPass.equals(newPass)) {
                throw new BizException(ExceptionEnum.OLD_PASS_DIFFER_CODE);
            } else {
                UserEntity updateUser = new UserEntity();
                updateUser.setUserId(passRequest.getUserId());
                updateUser.setPassword(passRequest.getNewPass());
                Date nowDate = new Date();
                updateUser.setMtime(nowDate);
                userMapper.updateByPrimaryKeySelective(updateUser);
            }
        }
    }

    @Override
    public String login(UserEntity userEntity) {
        UserEntity queryParam = new UserEntity();
        queryParam.setUsername(userEntity.getUsername());
        queryParam.setAvailable(1);
        List<UserEntity> queryResult = userMapper.selectBySelective(queryParam);
        if (!queryResult.isEmpty()) {
            String libDecodePassword = RSAUtils.decrypt(privateKey, queryResult.get(0).getPassword());
            String inputDecodePassword = RSAUtils.decrypt(privateKey, userEntity.getPassword());
            Integer userId = queryResult.get(0).getUserId();
            if (libDecodePassword.equals(inputDecodePassword)) {
                StpUtil.login(queryResult.get(0).getUserId());
                UserEntity loginUpdate = new UserEntity();
                loginUpdate.setUserId(queryResult.get(0).getUserId());
                loginUpdate.setLastLoginTime(new Date());
                userMapper.updateByPrimaryKeySelective(loginUpdate);
                GlobalVal.RETRY_TIMES.remove(userId);
                return StpUtil.getTokenInfo().getTokenValue();
            } else {
                if (GlobalVal.RETRY_TIMES.containsKey(userId)) {
                    Integer times = GlobalVal.RETRY_TIMES.get(userId);
                    times--;
                    if (times == 0) {
                        GlobalVal.RETRY_TIMES.remove(userId);
                        UserEntity lockedUser = new UserEntity();
                        lockedUser.setUserId(userId);
                        lockedUser.setAvailable(0);
                        userMapper.updateByPrimaryKeySelective(lockedUser);
                        /**
                         * 给当前用户邮箱发送邮件，内容：解锁账户的url，生成短链
                         */
                        throw new BizException(ExceptionEnum.USER_NOT_FOUND);
                    } else {
                        GlobalVal.RETRY_TIMES.put(userId, times);
                        throw new BizException(ExceptionEnum.LOGIN_RETRY.getCode(), ExceptionEnum.LOGIN_RETRY.getMsg().replace("{0}", String.valueOf(times)));
                    }
                } else {
                    Integer times = retryTimes;
                    GlobalVal.RETRY_TIMES.put(userId, --times);
                    throw new BizException(ExceptionEnum.LOGIN_RETRY.getCode(), ExceptionEnum.LOGIN_RETRY.getMsg().replace("{0}", String.valueOf(times)));
                }
            }
        } else {
            throw new BizException(ExceptionEnum.USER_NOT_FOUND);
        }
    }

    @Override
    public void resetPass(Integer userId) {
        String encryptedPass = RSAUtils.encrypt(publicKey, initPassword);
        UserEntity user = new UserEntity();
        user.setUserId(userId);
        user.setPassword(encryptedPass);
        userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public UserEntity getById(Integer userId) {
        return userMapper.selectByPrimaryKeyWithoutPass(userId);
    }

    @Override
    public void unlock(Integer userId) {
        UserEntity user = new UserEntity();
        user.setUserId(userId);
        user.setAvailable(1);
        userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public void initUser() {
        Integer count = userMapper.selectCount();
        if (count == null || count == 0) {
            log.warn("初始化站主信息中...");
            Date nowDate = new Date();
            UserEntity user = new UserEntity();
            String encryptedPass = RSAUtils.encrypt(publicKey, initPassword);
            user.setUsername(initUsername);
            user.setNickName(initUsername);
            user.setMail(initMail);
            user.setPassword(encryptedPass);
            user.setAvailable(1);
            user.setCtime(nowDate);
            user.setMtime(nowDate);
            userMapper.insert(user);
        }
    }
}
