package cn.fan.neat.service;

import cn.fan.neat.entity.po.ArticleEntity;
import com.alibaba.fastjson2.JSONObject;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface ArticleService {
    int save(ArticleEntity articleEntity);

    void update(ArticleEntity articleEntity);

    void delete(Integer articleId);

    ArticleEntity getContent(Integer articleId);

    PageInfo<ArticleEntity> findByPage(Integer pageNo, Integer pageSize, ArticleEntity articleEntity);

    List<JSONObject> findByArchive(ArticleEntity articleEntity);
}
