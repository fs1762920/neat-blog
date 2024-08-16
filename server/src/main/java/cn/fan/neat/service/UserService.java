package cn.fan.neat.service;

import cn.fan.neat.entity.vo.PassRequest;
import cn.fan.neat.entity.po.UserEntity;

public interface UserService {
    void update(UserEntity userEntity);

    void changePass(PassRequest passRequest);

    String login(UserEntity userEntity);

    void resetPass(Integer userId);

    UserEntity getById(Integer userId);

    void unlock(Integer userId);

    void initUser();

    void recoverAccountStatus();
}
