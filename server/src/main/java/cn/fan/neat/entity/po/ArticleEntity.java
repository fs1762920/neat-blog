package cn.fan.neat.entity.po;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class ArticleEntity implements Serializable {

    private Integer articleId;

    private String title;

    private String content;

    private Integer categoryId;

    private String categoryName;

    private String introduction;

    private Integer status;

    private Date ctime;

    private Date mtime;

    private CategoryEntity categoryEntity;
}
