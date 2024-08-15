package cn.fan.neat.mapper;

import cn.fan.neat.entity.po.CategoryEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

    List<CategoryEntity> selectBySelective(CategoryEntity param);

    void insert(CategoryEntity param);

    void updateBySelective(CategoryEntity param);

    void deleteByPrimaryKey(Integer categoryId);
}
