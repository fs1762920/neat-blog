package cn.fan.neat.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaIgnore;
import cn.dev33.satoken.stp.StpUtil;
import cn.fan.neat.constant.ExceptionEnum;
import cn.fan.neat.entity.dto.BaseReturnDto;
import cn.fan.neat.entity.vo.PassRequest;
import cn.fan.neat.entity.po.UserEntity;
import cn.fan.neat.exception.BizException;
import cn.fan.neat.service.UserService;
import com.alibaba.druid.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@CrossOrigin
@SaCheckLogin
@Slf4j
public class UserController {

    private final UserService userService;

    @Value("${sa-token.tokenPrefix}")
    private String tokenPrefix;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @SaIgnore
    @PostMapping("/login")
    public BaseReturnDto login(@RequestBody UserEntity userEntity) {
        if (StringUtils.isEmpty(userEntity.getUsername())
                || StringUtils.isEmpty(userEntity.getPassword())) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        String token = userService.login(userEntity);
        return BaseReturnDto.success("登录成功", token);
    }

    @GetMapping("/logout")
    public BaseReturnDto logout(HttpServletRequest request) {
        if (StpUtil.isLogin()) {
            StpUtil.logoutByTokenValue(request.getHeader("satoken").replace(tokenPrefix, "").trim());
        }
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "退出成功");
    }

    @PostMapping("/changePass")
    public BaseReturnDto changePass(@RequestBody PassRequest passRequest) {
        Integer userId = StpUtil.getLoginIdAsInt();
        passRequest.setUserId(userId);
        userService.changePass(passRequest);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "修改成功，请重新登录");
    }

    @GetMapping("/resetPass")
    public BaseReturnDto resetPass(Integer userId) {
        userService.resetPass(userId);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "操作成功");
    }

    @GetMapping("/info")
    public BaseReturnDto info() {
        Integer userId = StpUtil.getLoginIdAsInt();
        UserEntity info = userService.getById(userId);
        return BaseReturnDto.success(info);
    }

    @PostMapping("/updateSelf")
    public BaseReturnDto updateSelf(@RequestBody UserEntity userEntity) {
        Integer userId = StpUtil.getLoginIdAsInt();
        userEntity.setUserId(userId);
        userService.update(userEntity);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "操作成功");
    }

    @GetMapping("/unlock")
    public BaseReturnDto unlock(Integer userId) {
        if (userId == null) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        userService.unlock(userId);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "解锁成功");
    }

    @GetMapping("/website")
    @SaIgnore
    public BaseReturnDto website() {
        UserEntity info = userService.getWebsiteInfo();
        return BaseReturnDto.success(info);
    }
}
