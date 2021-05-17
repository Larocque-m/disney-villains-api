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
show tables;
DROP USER IF EXISTS 'newUser'@'localhost';
CREATE USER 'newUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password123';
GRANT ALL ON nfl. * TO 'newUser'@'localhost';
FLUSH PRIVILEGES;
select * from wrongdoers; 

insert into wrongdoers(name, movie, slug) values

('Captain Hook', 'Peter Pan', 'captain-hook'),
('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil'),
('Gaston', 'Beauty and the Beast', 'gaston'),
('Hades', 'Hercules', 'hades'),
('Horned King', 'The Black Cauldron', 'horned-king'),
('Jafar', 'Aladdin', 'jafar'),
('Lady Tremaine', 'Cinderella', 'lady-tremaine'),
('Madame Medusa', 'The Rescuers', 'madame-medusa'),
('Madam Mim', 'The Sword in the Stone', 'madam-mim'),
('Maleficent', 'Sleeping Beauty', 'maleficent'),
('Prince John', 'Robin Hood', 'prince-john'),
('Sir Hiss', 'Robin Hood', 'sir-hiss'),
('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde'),
('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts'),
('Scar', 'The Lion King', 'scar'),
('Shan Yu', 'Mulan', 'shan-yu'),
('Shere Khan', 'The Jungle Book', 'shere-khan'),
('Ursula', 'The Little Mermaid', 'ursula');

