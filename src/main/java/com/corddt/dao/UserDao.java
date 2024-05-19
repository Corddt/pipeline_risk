package com.corddt.dao;

import com.corddt.entity.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserDao {

    @Select("SELECT * FROM users WHERE username = #{username}")
    User findByUsername(@Param("username") String username);

    @Insert("INSERT IGNORE INTO users(username, password) VALUES(#{username}, #{password})")
    void saveUser(User user);
}