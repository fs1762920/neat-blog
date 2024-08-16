package cn.fan.neat.service.impl;

import cn.fan.neat.entity.po.ArticleEntity;
import cn.fan.neat.mapper.ArticleMapper;
import cn.fan.neat.service.ArticleService;
import com.alibaba.fastjson2.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Slf4j
public class ArticleServiceImpl implements ArticleService {

    private final ArticleMapper articleMapper;

    public ArticleServiceImpl(ArticleMapper articleMapper) {
        this.articleMapper = articleMapper;
    }


    @Override
    public int save(ArticleEntity articleEntity) {
        if (articleEntity.getStatus() == null) {
            // 默认存为草稿
            articleEntity.setStatus(0);
        }
        Date nowDate = new Date();
        articleEntity.setCtime(nowDate);
        articleEntity.setMtime(nowDate);
        articleMapper.insert(articleEntity);
        return articleEntity.getArticleId();
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

    @Override
    public List<JSONObject> findByArchive(ArticleEntity articleEntity) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy");
        List<ArticleEntity> dataList = articleMapper.selectBySelective(articleEntity);
        Map<String, List<ArticleEntity>> yearDateMap = new LinkedHashMap<>();
        for (ArticleEntity articleItem : dataList) {
            String year = format.format(articleItem.getCtime());
            if (yearDateMap.containsKey(year)) {
                yearDateMap.get(year).add(articleItem);
            } else {
                List<ArticleEntity> list = new ArrayList<>();
                list.add(articleItem);
                yearDateMap.put(year, list);
            }
        }
        List<JSONObject> result = new ArrayList<>();
        for (Map.Entry<String, List<ArticleEntity>> entry : yearDateMap.entrySet()) {
            JSONObject item = new JSONObject();
            item.put("year", entry.getKey());
            item.put("articles", entry.getValue());
            result.add(item);
        }
        return result;
    }
}
