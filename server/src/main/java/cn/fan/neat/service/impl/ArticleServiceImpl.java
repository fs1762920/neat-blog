package cn.fan.neat.service.impl;

import cn.fan.neat.entity.po.ArticleEntity;
import cn.fan.neat.mapper.ArticleMapper;
import cn.fan.neat.service.ArticleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class ArticleServiceImpl implements ArticleService {

    private final ArticleMapper articleMapper;

    public ArticleServiceImpl(ArticleMapper articleMapper) {
        this.articleMapper = articleMapper;
    }


    @Override
    public void add(ArticleEntity articleEntity) {
        if (articleEntity.getStatus() == null) {
            // 默认存为草稿
            articleEntity.setStatus(0);
        }
        Date nowDate = new Date();
        articleEntity.setCtime(nowDate);
        articleEntity.setMtime(nowDate);
        articleMapper.insert(articleEntity);
    }

    @Override
    public void update(ArticleEntity articleEntity) {
        Date nowDate = new Date();
        articleEntity.setMtime(nowDate);
        articleMapper.updateBySelective(articleEntity);
    }

    @Override
    public void delete(Integer articleId) {
        articleMapper.deleteByPrimaryKey(articleId);
    }

    @Override
    public ArticleEntity getContent(Integer articleId) {
        return articleMapper.selectByPrimaryKey(articleId);
    }

    @Override
    public PageInfo<ArticleEntity> findByPage(Integer pageNo, Integer pageSize, ArticleEntity articleEntity) {
        PageHelper.startPage(pageNo, pageSize);
        List<ArticleEntity> dataList = articleMapper.selectBySelective(articleEntity);
        return new PageInfo<>(dataList);
    }
}
