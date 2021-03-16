SELECT DATABASE();


CREATE DATABASE ams;

# 用户表
CREATE TABLE IF NOT EXISTS `user`(
`id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户id',
`username` VARCHAR(32) UNIQUE NOT NULL COMMENT '用户名',
`password` VARCHAR(128) NOT NULL COMMENT '用户密码',
`registerTime` BIGINT(20) DEFAULT NULL COMMENT '注册时间',
`updateTime` BIGINT(20) DEFAULT NULL COMMENT '更新时间',
`avatar` VARCHAR(256) DEFAULT NULL COMMENT '用户头像',
`phone` VARCHAR(32) DEFAULT NULL COMMENT '电话',
`gender` INT DEFAULT NULL COMMENT '性别',
`birth` BIGINT(20) DEFAULT NULL COMMENT '出生日期',
`location` VARCHAR(256) DEFAULT NULL COMMENT '所在地',
`registerAddress` VARCHAR(256) DEFAULT NULL COMMENT '注册地址信息',
`lastLoginAddress` VARCHAR(256) DEFAULT NULL COMMENT '最后登录地'
);

# 用户表添加delete
ALTER TABLE user ADD delete DEFAULT 0 COMMENT '删除用户0未删除1已删除'



# 文章表
CREATE TABLE IF NOT EXISTS `article` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '文章id',
  `title` VARCHAR(256) NOT NULL COMMENT '文章标题',
  `content` VARCHAR(10000) NOT NULL COMMENT '文章内容',
  `status` INT DEFAULT 0 COMMENT '文章状态 0 未审核 1审核通过',
  `tag` VARCHAR(128) DEFAULT '' COMMENT '文章所属标签',
  `directory` VARCHAR(128) DEFAULT '' COMMENT '文章分类目录',
  `comment_status` INT DEFAULT 0 COMMENT '文章是否可以被评论0 不允许1 允许',
  `author` INT DEFAULT NULL COMMENT '发布文章的作者',
  `praise` INT DEFAULT 0 COMMENT '文章获取的赞',
  `createTime` BIGINT(20) DEFAULT 0000000000 COMMENT '创建时间',
  `updateTime` BIGINT(20) DEFAULT 0000000000 COMMENT '更新时间'
);

# 标签表
CREATE TABLE IF NOT EXISTS `tags`(
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '标签id',
  `name` VARCHAR(128) NOT NULL COMMENT '标签名',
  `tag_group` INT DEFAULT 0 COMMENT '标签有多少文章'
);

# 添加一列
ALTER TABLE tags ADD create_time DEFAULT 0

# 分类目录表
CREATE TABLE IF NOT EXISTS `directory`(
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '目录id',
  `name` VARCHAR(128) NOT NULL COMMENT '目录名',
  `tag_group` INT DEFAULT 0 COMMENT '目录有多少文章'
);
# 添加一列
ALTER TABLE directory ADD create_time DEFAULT 0

ALTER TABLE directory ADD parent_id INT DEFAULT NULL

ALTER TABLE directory CHANGE tag_group directory_group 

# 创建关系表
# 文章标签关系表

CREATE TABLE IF NOT EXISTS `article_select_tag`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `article_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  FOREIGN KEY (article_id) REFERENCES article(id) ON UPDATE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS `article_select_directory`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `article_id` INT NOT NULL,
  `directory_id` INT NOT NULL,
  FOREIGN KEY (article_id) REFERENCES article(id) ON UPDATE CASCADE,
  FOREIGN KEY (directory_id) REFERENCES directory(id) ON UPDATE CASCADE
);

# 登录表
CREATE TABLE IF NOT EXISTS `login` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `account` VARCHAR(128) NOT NULL COMMENT '账号',
  `password` VARCHAR(128) NOT NULL COMMENT '密码'
);

ALTER TABLE user ADD user_id INT NOT NULL

ALTER TABLE user ADD FOREIGN KEY (user_id) REFERENCES login(id);