INSERT INTO `blood_donation`.`address`
(`building`,`village_road`,`post_office`,`city`,`district`,`longitude`,`latitude`)
VALUES
("SHAHI HOUSE","12/A ROAD3","POST OFFICE3","khulshi","CHITTAGONG",90.99,55.55);

SELECT * FROM `blood_donation`.`address`;
SELECT a_id FROM address WHERE district='chittagong';

SELECT * from `blood_donation`.`address` where a_id = last_insert_id();

INSERT INTO `blood_donation`.`users`
(`first_name`,`last_name`,`email`,`password`)
VALUES
( "TANHAB", "HOSSAIN","tanhab1@gmail.com","sdlfjdskjhfkjdshfkj");

INSERT INTO `blood_donation`.`users`
(`first_name`,`last_name`,`email`,`password`)
VALUES
( "ANANNA", "DRISTY","dristy@gmail.com","sjbwjgbwiwjvwej");

SELECT * FROM `blood_donation`.`users`;

INSERT INTO `blood_donation`.`donor`
(`nid_birthCtf`,`uid`,`last_donated`,`blood_group` ,`phone_no`,`a_id`)
VALUES
( "1974", "3",'2022-01-16',"O+",03888343,5);

INSERT INTO `blood_donation`.`donor`
(`nid_birthCtf`,`uid`,`last_donated`,`blood_group` ,`phone_no`,`a_id`)
VALUES
( "1989884", "4",'2022-01-16',"B+",03343,5);

INSERT INTO `blood_donation`.`donor`
(`nid_birthCtf`,`uid`,`last_donated`,`blood_group` ,`phone_no`,`a_id`)
VALUES
( "126", "2",'2022-01-16',"O-",088343,1);

INSERT INTO `blood_donation`.`donor`
(`nid_birthCtf`,`uid`,`last_donated`,`blood_group` ,`phone_no`,`a_id`)
VALUES
( "126766", "1",now(),"A-",08338343,1);


SELECT * FROM `blood_donation`.`donor`;

INSERT INTO `blood_donation`.`recipient`
(`nid_birthCtf`,`uid`,`last_received`,`blood_group` ,`phone_no`,`a_id`)
VALUES
( "12345678", "1",now(),"A-",08338343,1);

SELECT * FROM `blood_donation`.`recipient`;

INSERT INTO medical_centre(
	name,phone_no,a_id,verified
) VALUES ("SMC",123456,1,1);
SELECT * from medical_centre;
INSERT INTO medical_history(
	uid,last_checked,checked_at,physical_illness,genetical_issues
) VALUES ( 4,NOW(), 1,"AIDS","Color blind"); 

SELECT * from medical_history;

UPDATE `blood_donation`.`users` SET `a_id`= 8 WHERE `email` = "a@gmail.com";

-- admin user 
INSERT INTO `blood_donation`.`users`
(`first_name`,`last_name`,`email`,`password`, `is_admin`)
VALUES
( "ANA", "DRISTY","ad@gmail.com","qwerty", 1);

INSERT INTO `blood_donation`.`driver`
(`driving_license`,`first_name`,`last_name`,`station`,`a_id`)
VALUES
(1234, "DRISTY","ad@gmail.com",2, 1);

INSERT INTO `blood_donation`.`blood_request` 
(`nid_birthCtf`, `uid`, `blood_group`, `phone_no`, `a_id`) VALUES ('124', '2', 'A+', '4534534', '4');

INSERT INTO `blood_donation`.`medical_centre`
(`nid_birthCtf`, `uid`, `blood_group`, `phone_no`, `a_id`) VALUES ('124', '2', 'A+', '4534534', '4');

SELECT * from `blood_donation`.`blood_request`;
SELECT * from `blood_donation`.`medical_centre`;