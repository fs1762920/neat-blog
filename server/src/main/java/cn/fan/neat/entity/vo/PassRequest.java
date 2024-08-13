package cn.fan.neat.entity.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class PassRequest implements Serializable {

    private Integer userId;

    private String oldPass;

    private String newPass;
}
