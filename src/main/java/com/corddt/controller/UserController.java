package com.corddt.controller;

import com.corddt.entity.User;
import com.corddt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
public class UserController {

    private static final Logger logger = Logger.getLogger(UserController.class.getName());

    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public String index() {
        logger.log(Level.INFO, "Accessing index page");
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        logger.log(Level.INFO, "Accessing register page");
        return "register";
    }

    @PostMapping("/user/register")
    public String registerUser(@RequestBody User user) {
        logger.log(Level.INFO, "Registering user: {0}", user.getUsername());
        userService.saveUser(user);
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login() {
        logger.log(Level.INFO, "Accessing login page");
        return "login";
    }

    @PostMapping("/user/login")
    @ResponseBody
    public String loginUser(@RequestBody User user) {
        logger.log(Level.INFO, "User login attempt: {0}", user.getUsername());
        User foundUser = userService.findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            logger.log(Level.INFO, "User login successful: {0}", user.getUsername());
            return "success";
        } else {
            logger.log(Level.WARNING, "Incorrect password for user: {0}", user.getUsername());
            return "error";
        }
    }

    @GetMapping("/user/check")
    @ResponseBody
    public boolean checkUsername(@RequestParam String username) {
        logger.log(Level.INFO, "Checking username: {0}", username);
        return userService.isUsernameTaken(username);
    }

    @GetMapping("/main")
    public String home() {
        logger.log(Level.INFO, "Accessing main page");
        return "main";
    }

    @GetMapping("/login-error")
    public String loginError() {
        logger.log(Level.INFO, "Accessing login error page");
        return "login-error";
    }
}