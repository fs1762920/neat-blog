package cn.fan.neat.service.impl;

import cn.fan.neat.entity.po.CategoryEntity;
import cn.fan.neat.mapper.CategoryMapper;
import cn.fan.neat.service.CategoryService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }


    @Override
    public void add(CategoryEntity categoryEntity) {
        Date nowDate = new Date();
        categoryEntity.setCtime(nowDate);
        categoryEntity.setMtime(nowDate);
        categoryMapper.insert(categoryEntity);
    }

    @Override
    public void update(CategoryEntity categoryEntity) {
        categoryMapper.updateBySelective(categoryEntity);
    }

    @Override
    public List<CategoryEntity> findAll() {
        return categoryMapper.selectBySelective(new CategoryEntity());
    }

    @Override
    public PageInfo<CategoryEntity> findByPage(Integer pageNo, Integer pageSize, CategoryEntity categoryEntity) {
        PageHelper.startPage(pageNo, pageSize);
        List<CategoryEntity> dataList = categoryMapper.selectBySelective(new CategoryEntity());
        return new PageInfo<>(dataList);
    }

    @Override
    public void delete(Integer categoryId) {
        categoryMapper.deleteByPrimaryKey(categoryId);
    }
}
