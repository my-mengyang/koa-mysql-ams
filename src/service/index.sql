SELECT DATABASE();


CREATE DATABASE ams;


# 登录表
CREATE TABLE IF NOT EXISTS `login`
(
    `id`       INT PRIMARY KEY AUTO_INCREMENT,
    `account`  VARCHAR(128) NOT NULL COMMENT '账号',
    `password` VARCHAR(128) NOT NULL COMMENT '密码'
);


# 用户表
CREATE TABLE IF NOT EXISTS `user`
(
    `id`               INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户id',
    `name`             VARCHAR(255) DEFAULT NULL COMMENT '用户名',
    `registerTime`     BIGINT(20)   DEFAULT NULL COMMENT '注册时间',
    `updateTime`       BIGINT(20)   DEFAULT NULL COMMENT '更新时间',
    `avatar`           VARCHAR(256) DEFAULT NULL COMMENT '用户头像',
    `phone`            VARCHAR(32)  DEFAULT NULL COMMENT '电话',
    `gender`           INT          DEFAULT NULL COMMENT '性别1男2女',
    `birth`            BIGINT(20)   DEFAULT NULL COMMENT '出生日期',
    `country`          INT          DEFAULT 1 COMMENT '国家',
    `city`             INT          DEFAULT null COMMENT '城市',
    `registerAddress`  VARCHAR(256) DEFAULT NULL COMMENT '注册地址信息',
    `lastLoginAddress` VARCHAR(256) DEFAULT NULL COMMENT '最后登录地',
    `laseLoginTime`    bigint       DEFAULT NULL COMMENT '最后登录时间',
    `deleted`          INT          DEFAULT 0 COMMENT '逻辑删除0未删除1已删除',
    `user_id`          INT COMMENT '外键',
    FOREIGN KEY (user_id) REFERENCES login (id)
);


# 文章表
CREATE TABLE IF NOT EXISTS `article`
(
    `id`             INT PRIMARY KEY AUTO_INCREMENT COMMENT '文章id',
    `title`          VARCHAR(256)   NOT NULL COMMENT '文章标题',
    `content`        VARCHAR(20000) NOT NULL COMMENT '文章内容',
    `status`         INT          DEFAULT 0 COMMENT '文章状态 1 草稿 2待审核 3审核通过 4 审核拒绝',
    `tag`            VARCHAR(128) DEFAULT '' COMMENT '文章所属标签',
    `directory`      VARCHAR(128) DEFAULT '' COMMENT '文章分类目录',
    `comment_status` INT          DEFAULT 0 COMMENT '文章是否可以被评论0 不允许1 允许',
    `author`         INT          DEFAULT NULL COMMENT '发布文章的作者',
    `praise`         INT          DEFAULT 0 COMMENT '文章获取的赞',
    `createTime`     BIGINT(20)   DEFAULT 0000000000 COMMENT '创建时间',
    `updateTime`     BIGINT(20)   DEFAULT 0000000000 COMMENT '更新时间',
    `readVolume`     INT          DEFAULT 0 COMMENT '阅读量'
);

# 标签表
CREATE TABLE IF NOT EXISTS `tags`
(
    `id`          INT PRIMARY KEY AUTO_INCREMENT COMMENT '标签id',
    `type`        INT    DEFAULT NULL COMMENT '类型 1 标签 2分类目录',
    `name`        VARCHAR(128) NOT NULL COMMENT '标签名',
    `create_time` BIGINT DEFAULT 0 COMMENT '创建时间',
    `group_count` INT    DEFAULT 0 COMMENT '标签有多少文章',
    `parent_id`   INT    DEFAULT NULL COMMENT '父元素id'
);



# 创建关系表
# 文章标签关系表
CREATE TABLE IF NOT EXISTS `article_label`
(
    `id`         INT PRIMARY KEY AUTO_INCREMENT COMMENT '关系表id',
    `article_id` INT NOT NULL COMMENT '文章id',
    `label_id`   INT NOT NULL COMMENT 'label_id',
    FOREIGN KEY (article_id) REFERENCES article (id) ON UPDATE CASCADE,
    FOREIGN KEY (label_id) REFERENCES label (id) ON UPDATE CASCADE
);


# 评论表
CREATE TABLE IF NOT EXISTS `comment`
(
    `id`           INT PRIMARY KEY AUTO_INCREMENT COMMENT '评论id',
    `article_id`   INT           NOT NULL COMMENT '文章id',
    `type`         INT           NOT NULL COMMENT '类型1评论文章  2回复评论',
    `content`      VARCHAR(1024) NOT NULL COMMENT '评论内容',
    `from_name`    VARCHAR(128)  NOT NULL COMMENT '评论人用户名',
    `from_email`   VARCHAR(128)  NOT NULL COMMENT '评论人email',
    `from_website` VARCHAR(128) DEFAULT NULL COMMENT '评论人网址',
    `praise`       BIGINT(20)   DEFAULT 0 COMMENT '这条评论的点赞量',
    `to_name`      VARCHAR(1024) NOT NULL COMMENT '被评论人用户名',
    `to_email`     VARCHAR(128)  NOT NULL COMMENT '被评论人邮箱',
    `to_website`   VARCHAR(128) DEFAULT NULL COMMENT '被评论人网址',
    `deleted`      INT          DEFAULT 0 COMMENT '是否删除评论',
    `userAgent`    VARCHAR(255) DEFAULT NULL COMMENT '用户设备',
    `status`       INT          DEFAULT 0 COMMENT '0 待审核 1审核通过 2审核拒绝',
    `createTime`   BIGINT       DEFAULT 0 COMMENT '创建时间',
    FOREIGN KEY (article_id) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

# 友链表
CREATE TABLE IF NOT EXISTS `friend`
(
    `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '友链id',
    `name` VARCHAR(255) NOT NULL COMMENT '网站名',
    `websiteIcon` VARCHAR(255) NOT NULL COMMENT '网站图标',
    `website` VARCHAR(255) NOT NULL COMMENT '网址',
    `status` INT DEFAULT 0 COMMENT '0待审核 1审核成功 2审核拒绝',
)

