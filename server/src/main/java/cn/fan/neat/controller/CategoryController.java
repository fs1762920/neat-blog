package cn.fan.neat.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaIgnore;
import cn.fan.neat.constant.ExceptionEnum;
import cn.fan.neat.entity.dto.BaseReturnDto;
import cn.fan.neat.entity.po.CategoryEntity;
import cn.fan.neat.exception.BizException;
import cn.fan.neat.service.CategoryService;
import com.alibaba.druid.util.StringUtils;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin
@SaCheckLogin
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/add")
    public BaseReturnDto add(@RequestBody CategoryEntity categoryEntity) {
        if (StringUtils.isEmpty(categoryEntity.getCategoryName())) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        categoryService.add(categoryEntity);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "添加成功");
    }


    @PostMapping("/update")
    public BaseReturnDto update(@RequestBody CategoryEntity categoryEntity) {
        if (categoryEntity.getCategoryId() == null || StringUtils.isEmpty(categoryEntity.getCategoryName())) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        categoryService.update(categoryEntity);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "添加成功");
    }

    @GetMapping("/findAll")
    @SaIgnore
    public BaseReturnDto findAll() {
        List<CategoryEntity> result = categoryService.findAll();
        return BaseReturnDto.success(result);
    }

    @GetMapping("/findByPage")
    public BaseReturnDto findByPage(Integer pageNo, Integer pageSize, CategoryEntity categoryEntity) {
        PageInfo<CategoryEntity> result = categoryService.findByPage(pageNo, pageSize, categoryEntity);
        return BaseReturnDto.success(result);
    }

    @GetMapping("/delete")
    public BaseReturnDto delete(Integer categoryId) {
        if (categoryId == null) {
            throw new BizException(ExceptionEnum.ILLEGAL_PARAM_ERROR);
        }
        categoryService.delete(categoryId);
        return BaseReturnDto.success(BaseReturnDto.RESP_SUCCESS_CODE, "删除成功");
    }

}
