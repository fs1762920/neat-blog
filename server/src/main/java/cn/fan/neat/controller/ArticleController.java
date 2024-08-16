package cn.fan.neat.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaIgnore;
import cn.fan.neat.constant.ExceptionEnum;
import cn.fan.neat.entity.dto.BaseReturnDto;
import cn.fan.neat.entity.po.ArticleEntity;
import cn.fan.neat.exception.BizException;
import cn.fan.neat.service.ArticleService;
import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson2.JSONObject;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/article")
@CrossOrigin
@SaCheckLogin
@Slf4j
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    // 新增文章
    @PostMapping("/save")
    public BaseReturnDto save(@RequestBody ArticleEntity articleEntity) {
        if (StringUtils.isEmpty(articleEntity.getTitle()) || StringUtils.isEmpty(articleEntity.getContent())) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        int articleId = articleService.save(articleEntity);
        return BaseReturnDto.success(articleId, "保存成功");
    }

    // 修改文章
    @PostMapping("/update")
    public BaseReturnDto update(@RequestBody ArticleEntity articleEntity) {
        if (articleEntity.getArticleId() == null) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        articleService.update(articleEntity);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "保存成功");
    }

    // 删除文章
    @GetMapping("/delete")
    public BaseReturnDto delete(Integer articleId) {
        if (articleId == null) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        articleService.delete(articleId);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "删除成功");
    }

    // 查询文章明细
    @GetMapping("/content")
    @SaIgnore
    public BaseReturnDto getContent(Integer articleId) {
        if (articleId == null) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        ArticleEntity result = articleService.getContent(articleId);
        return BaseReturnDto.success(result);
    }

    // 分页查询，不带content
    @GetMapping("/findByPage")
    public BaseReturnDto findByPage(Integer pageNo, Integer pageSize, ArticleEntity articleEntity) {
        PageInfo<ArticleEntity> result = articleService.findByPage(pageNo, pageSize, articleEntity);
        return BaseReturnDto.success(result);
    }


    @GetMapping("/findByArchive")
    @SaIgnore
    public BaseReturnDto findByArchive() {
        ArticleEntity articleEntity = new ArticleEntity();
        articleEntity.setStatus(1);
        List<JSONObject> result = articleService.findByArchive(articleEntity);
        return BaseReturnDto.success(result);
    }

    // 门户分页查询
    @GetMapping("/findPortalByPage")
    @SaIgnore
    public BaseReturnDto findPortalByPage(Integer pageNo, Integer pageSize, ArticleEntity articleEntity) {
        // 查询 已发布文章
        articleEntity.setStatus(1);
        PageInfo<ArticleEntity> result = articleService.findByPage(pageNo, pageSize, articleEntity);
        return BaseReturnDto.success(result);
    }

}
