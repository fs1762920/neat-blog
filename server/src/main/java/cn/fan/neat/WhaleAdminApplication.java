package cn.fan.neat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WhaleAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(WhaleAdminApplication.class, args);
    }
}
