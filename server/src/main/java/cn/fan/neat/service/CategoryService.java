package cn.fan.neat.service;

import cn.fan.neat.entity.po.CategoryEntity;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface CategoryService {
    void save(CategoryEntity categoryEntity);

    void update(CategoryEntity categoryEntity);

    List<CategoryEntity> findAll();

    PageInfo<CategoryEntity> findByPage(Integer pageNo, Integer pageSize, CategoryEntity categoryEntity);

    void delete(Integer categoryId);
}
