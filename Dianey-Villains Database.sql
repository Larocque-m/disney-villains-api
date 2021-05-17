create database DisneyVillains;

use DisneyVillains; 
create table wrongdoers (
name varchar(255),
movie varchar(255),
slug varchar(255),
createdAt datetime default current_timestamp, 
updatedAt datetime default current_timestamp on update current_timestamp, 
deletedAt datetime, 
Primary Key(name)
);
