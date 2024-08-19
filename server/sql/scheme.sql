CREATE DATABASE `neat_blog`;

-- neat_blog.n_article definition

CREATE TABLE `n_article` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` int DEFAULT NULL,
  `introduction` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1' COMMENT '0 草稿 1 已发布',
  `ctime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- neat_blog.n_category definition

CREATE TABLE `n_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `ctime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sort` int DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- neat_blog.n_user definition

CREATE TABLE `n_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `nick_name` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mail` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `github` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `available` int NOT NULL DEFAULT '1' COMMENT '0 锁定  1 可用',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  `mtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_login_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户表';