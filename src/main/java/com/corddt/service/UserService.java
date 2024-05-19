package com.corddt.service;

import com.corddt.entity.User;

public interface UserService {
    User findByUsername(String username);
    void saveUser(User user);
    boolean isUsernameTaken(String username);
}