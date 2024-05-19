package com.corddt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@MapperScan("com.corddt.dao")
@EnableWebMvc
public class PipelineRiskApplication {
    public static void main(String[] args) {
        SpringApplication.run(PipelineRiskApplication.class, args);
    }
}