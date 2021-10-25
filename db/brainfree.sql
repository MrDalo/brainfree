--basix sql skript na vytvorenie tabuliek a testovacích dát
use brainfree;
drop table users;

create table users(
    username varchar(20) PRIMARY KEY NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

insert into users (username, password, email) VALUES ('sheevsh', 'iamsenate123', 'empypalpy@galamail.fge');

SELECT * FROM users;