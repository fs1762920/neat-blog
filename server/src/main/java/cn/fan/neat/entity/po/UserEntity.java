package cn.fan.neat.entity.po;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class UserEntity implements Serializable {

    private Integer userId;

    private String username;

    private String password;

    private String nickName;

    private String mail;

    private String phone;

    // 0 锁定  1 正常
    private Integer available;

    private String avatarPath;

    private Date ctime;

    private Date mtime;

    private Date lastLoginTime;
}
