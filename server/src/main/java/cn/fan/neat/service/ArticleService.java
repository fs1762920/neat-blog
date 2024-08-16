package cn.fan.neat.service;

import cn.fan.neat.entity.po.ArticleEntity;
import com.github.pagehelper.PageInfo;

public interface ArticleService {
    void save(ArticleEntity articleEntity);

    void update(ArticleEntity articleEntity);

    void delete(Integer articleId);

    ArticleEntity getContent(Integer articleId);

    PageInfo<ArticleEntity> findByPage(Integer pageNo, Integer pageSize, ArticleEntity articleEntity);
}
