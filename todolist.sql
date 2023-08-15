/*
 Navicat Premium Data Transfer

 Source Server         : ttt
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : todolist

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 26/03/2023 01:51:19
*/

use todolist;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `list`;
-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
                         `taskId` int(11) NOT NULL AUTO_INCREMENT,
                         `userId` int(11),
                         `taskName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `beginDate` date NULL DEFAULT NULL,
                         `endDate` date NULL DEFAULT NULL,
                         `description` varchar(1600) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                         `taskDone` int(11) NOT NULL COMMENT 'whether you do or not',
                         `doneDate` date DEFAULT NULL,
                         `taskType` varchar(255) NOT NULL,
                         PRIMARY KEY (`taskId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
                         `userId` int(11) NOT NULL AUTO_INCREMENT,
                         `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `verification`;
CREATE TABLE `verification` (
                                `verificationId` int(11) NOT NULL AUTO_INCREMENT,
                                `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                `number` int(11) NOT NULL,
                                PRIMARY KEY (`verificationId`) USING BTREE
);

DROP TABLE IF EXISTS `reviewTask`;
CREATE TABLE `reviewTask`(
                             `reviewTaskId` int(11) NOT NULL AUTO_INCREMENT,
                             `userId` int(11),
                             `taskName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `date` date NOT NULL,
                             `description` varchar(1600) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `taskDone` int(11) DEFAULT 0,
                             `taskType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                             PRIMARY KEY (`reviewTaskId`) USING BTREE
);

DROP TABLE IF EXISTS `report`;
CREATE TABLE `report`(
                         `reportId` int(11) NOT NULL AUTO_INCREMENT,
                         `userId` int(11) NOT NULL ,
                         `content` varchar(16000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                         PRIMARY KEY (`reportId`) USING BTREE
);
DROP TABLE IF EXISTS `habit`;
CREATE TABLE `habit`(
                        `habitId` int(11) NOT NULL AUTO_INCREMENT,
                        `habitName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci not null ,
                        `userId` int(11) NOT NULL,
                        `beginDate` date not NULL,
                        `lastDays` int(11) default 0 not null ,
                        `DAY1` int(1) default null,
                        `DAY2` int(1) default null,
                        `DAY3` int(1) default null,
                        `DAY4` int(1) default null,
                        `DAY5` int(1) default null,
                        `DAY6` int(1) default null,
                        `DAY7` int(1) default null,
                        PRIMARY KEY (`habitId`) USING BTREE
);
DROP TABLE IF EXISTS `planTask`;
CREATE TABLE `planTask`(
                           `planTaskId` int(11) NOT NULL AUTO_INCREMENT,
                           `planTaskName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci not null ,
                           `userId` int(11) NOT NULL,
                           `beginDate` date not NULL,
                           `endDate` date not null ,
                           `done` int default 0,
                           `total` int not null ,
                           PRIMARY KEY (`planTaskId`) USING BTREE
);
DROP TABLE IF EXISTS `taskEachDay`;
CREATE TABLE `taskEachDay`
(
    `taskEachDayId` int(11) NOT NULL AUTO_INCREMENT,
    `userId`        int(11) not null,
    `DAY1`          int(1) default 0,
    `DAY2`          int(1) default 0,
    `DAY3`          int(1) default 0,
    `DAY4`          int(1) default 0,
    `DAY5`          int(1) default 0,
    `DAY6`          int(1) default 0,
    `DAY7`          int(1) default 0,
    PRIMARY KEY (`taskEachDayId`) USING BTREE
)