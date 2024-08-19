package cn.fan.neat.mapper;

import cn.fan.neat.entity.po.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    UserEntity selectByPrimaryKey(Integer userId);

    UserEntity selectByPrimaryKeyWithoutPass(Integer userId);

    List<UserEntity> selectBySelective(UserEntity record);

    void insert(UserEntity record);

    void updateByPrimaryKeySelective(UserEntity record);

    void deleteByPrimaryKey(Integer userId);

    Integer selectCount();

    UserEntity selectOne(UserEntity userEntity);
}
