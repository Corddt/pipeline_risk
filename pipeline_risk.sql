-- 创建数据库
CREATE DATABASE IF NOT EXISTS pipeline_risk;

-- 使用创建的数据库
USE pipeline_risk;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
                                    username VARCHAR(255) PRIMARY KEY,
                                    password VARCHAR(255) NOT NULL
);

ALTER TABLE users
    ADD CONSTRAINT uk_username UNIQUE (username);