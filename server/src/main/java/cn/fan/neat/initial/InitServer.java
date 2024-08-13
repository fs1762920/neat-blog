package cn.fan.neat.initial;

import cn.fan.neat.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class InitServer {

    private final UserService userService;

    public InitServer(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        // 初始化用户
        log.info("初始化主站信息中...");
        userService.initUser();
    }
}
