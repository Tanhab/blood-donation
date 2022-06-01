INSERT INTO `blood_donation`.`address`
(`building`,`village_road`,`post_office`,`city`,`district`,`longitude`,`latitude`)
VALUES
("SHAHI HOUSE","12/A ROAD3","POST OFFICE3","khulshi","CHITTAGONG",90.99,55.55);

SELECT * FROM `blood_donation`.`address`;

SELECT * from `blood_donation`.`address` where a_id = last_insert_id();

INSERT INTO `blood_donation`.`users`
(`first_name`,`last_name`,`email`,`blood_group`,`a_id`,`phone_no`,`password`)
VALUES
( "TANHAB", "HOSSAIN","tanhab1@gmail.com", "A+",1,null,"sdlfjdskjhfkjdshfkj");

SELECT * FROM `blood_donation`.`users`;

INSERT INTO medical_centre(
	name,phone_no,a_id,verified
) VALUES ("SMC",123456,3,1);
SELECT * from medical_centre;
INSERT INTO medical_history(
	uid,last_checked,checked_at,physical_illness,genetical_issues
) VALUES ( 4,NOW(), 1,"AIDS","Color blind"); 

SELECT * from medical_history;

UPDATE `blood_donation`.`users` SET `a_id`= 8 WHERE `email` = "a@gmail.com"


