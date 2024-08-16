package cn.fan.neat.job;

import cn.fan.neat.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AccountScheduler {

    private final UserService userService;

    public AccountScheduler(UserService userService) {
        this.userService = userService;
    }

    @Scheduled(cron = "0 0 2 * * ?")
    public void recoverAccountStatus() {
        // 恢复账号状态
        userService.recoverAccountStatus();
    }
}
