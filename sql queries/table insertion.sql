INSERT INTO `blood_donation`.`adress`
(`building`,`village_road`,`post_office`,`city`,`district`,`longitude`,`lattitude`)
VALUES
("SHAHI HOUSE","12/A ROAD3","POST OFFICE3","khulshi","CHITTAGONG",90.99,55.55);

SELECT * FROM adress;
select * from adress where a_id = last_insert_id();

INSERT INTO `blood_donation`.`users`
(`first_name`,`last_name`,`email`,`blood_group`,`a_id`,`phone_no`,`password`)
VALUES
( "TANHAB", "HOSSAIN","tanhab1@gmail.com", "A+",6,null,"sdlfjdskjhfkjdshfkj");

SELECT * FROM users;

