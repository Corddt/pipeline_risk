package com.corddt.service.impl;

import com.corddt.dao.UserDao;
import com.corddt.entity.User;
import com.corddt.service.UserService;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = Logger.getLogger(UserServiceImpl.class.getName());

    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User findByUsername(String username) {
        logger.log(Level.INFO, "Finding user by username: {0}", username);
        return userDao.findByUsername(username);
    }

    @Override
    public void saveUser(User user) {
        logger.log(Level.INFO, "Saving user: {0}", user.getUsername());
        userDao.saveUser(user);
    }

    @Override
    public boolean isUsernameTaken(String username) {
        logger.log(Level.INFO, "Checking if username is taken: {0}", username);
        return userDao.findByUsername(username) != null;
    }
}