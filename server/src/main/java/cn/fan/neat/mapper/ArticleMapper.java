package cn.fan.neat.mapper;

import cn.fan.neat.entity.po.ArticleEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleMapper {
    void insert(ArticleEntity articleEntity);

    void updateBySelective(ArticleEntity articleEntity);

    void deleteByPrimaryKey(Integer articleId);

    ArticleEntity selectByPrimaryKey(Integer articleId);

    List<ArticleEntity> selectBySelective(ArticleEntity articleEntity);
}
