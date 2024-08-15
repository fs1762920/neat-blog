package cn.fan.neat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NeatApplication {

    public static void main(String[] args) {
        SpringApplication.run(NeatApplication.class, args);
    }
}
