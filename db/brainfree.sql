CREATE DATABASE IF NOT EXISTS brainfree;
USE brainfree;

create table if not exists users(
    `username` varchar(20) PRIMARY KEY NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL
);

create table if not exists tasks(
    `id` int(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255),
    `priority` varchar(255),
    `deadline`date NOT NULL,
    `complete` boolean,
    `user` varchar(20) NOT NULL,
    FOREIGN KEY (user) REFERENCES users (username)
);