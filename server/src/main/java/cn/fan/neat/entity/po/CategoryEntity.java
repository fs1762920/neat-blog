package cn.fan.neat.entity.po;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class CategoryEntity implements Serializable {

    private Integer categoryId;

    private String categoryName;

    private Integer sort;

    private Date ctime;

    private Date mtime;
}
