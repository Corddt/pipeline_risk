package com.corddt.controller;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 名称:PageController
 * 描述:页面跳转控制器
 *
 * @version 1.0
 * @author:corddt
 * @datatime:2024-05-19 18:04
 */
@Controller
public class PageController {
    private static final Logger logger = LogManager.getLogger(PageController.class);

    @RequestMapping("/data01.html")
    public String data01() {
        logger.log(Level.INFO, "Accessing data01 page");
        return "data01.html";
    }

    @RequestMapping("/data02.html")
    public String data02() {
        logger.log(Level.INFO, "Accessing data02 page");
        return "data02.html";
    }

    @RequestMapping("/login.html")
    public String login() {
        logger.log(Level.INFO, "Accessing login page");
        return "login.html";
    }

    @RequestMapping("/main.html")
    public String main() {
        logger.log(Level.INFO, "Accessing main page");
        return "main.html";
    }

    @RequestMapping("/new.html")
    public String newPage() {
        logger.log(Level.INFO, "Accessing new page");
        return "new.html";
    }

    @RequestMapping("/newdata.html")
    public String newdata() {
        logger.log(Level.INFO, "Accessing newdata page");
        return "newdata.html";
    }

    @RequestMapping("/newdata1.html")
    public String newdata1() {
        logger.log(Level.INFO, "Accessing newdata1 page");
        return "newdata1.html";
    }

    @RequestMapping("/newdata2.html")
    public String newdata2() {
        logger.log(Level.INFO, "Accessing newdata2 page");
        return "newdata2.html";
    }

    @RequestMapping("/newdata3.html")
    public String newdata3() {
        logger.log(Level.INFO, "Accessing newdata3 page");
        return "newdata3.html";
    }

    @RequestMapping("/newdata4.html")
    public String newdata4() {
        logger.log(Level.INFO, "Accessing newdata4 page");
        return "newdata4.html";
    }

    @RequestMapping("/newdata5.html")
    public String newdata5() {
        logger.log(Level.INFO, "Accessing newdata5 page");
        return "newdata5.html";
    }

    @RequestMapping("/person01.html")
    public String person01() {
        logger.log(Level.INFO, "Accessing person01 page");
        return "person01.html";
    }

    @RequestMapping("/result01.html")
    public String result01() {
        logger.log(Level.INFO, "Accessing result01 page");
        return "result01.html";
    }

    @RequestMapping("/result02.html")
    public String result02() {
        logger.log(Level.INFO, "Accessing result02 page");
        return "result02.html";
    }

    @RequestMapping("/risk01.html")
    public String risk01() {
        logger.log(Level.INFO, "Accessing risk01 page");
        return "risk01.html";
    }

    @RequestMapping("/risk02.html")
    public String risk02() {
        logger.log(Level.INFO, "Accessing risk02 page");
        return "risk02.html";
    }

    @RequestMapping("/testtt.html")
    public String testtt() {
        logger.log(Level.INFO, "Accessing testtt page");
        return "testtt.html";
    }
}