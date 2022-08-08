 CREATE DATABASE blood_donation;
 
 use blood_donation;
 

  -- user table 
  CREATE TABLE `blood_donation`.`users` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `is_admin` TINYINT(1) UNSIGNED NULL DEFAULT 0,
  `password` TEXT NOT NULL,
  PRIMARY KEY (`uid`));
    
-- donor
CREATE TABLE `blood_donation`.`donor`(
`nid_birthCtf` BIGINT(20) NOT NULL,
`uid` INT NOT NULL,
`last_donated` DATETIME NOT NULL,
`blood_group` VARCHAR(3) NOT NULL,
`phone_no` BIGINT(15) NOT NULL,
`a_id` INT NOT NULL,
 PRIMARY KEY (`nid_birthCtf`),
 FOREIGN KEY (`uid`) REFERENCES `blood_donation`.`users`(`uid`),
 FOREIGN KEY (`a_id`) REFERENCES `blood_donation`.`address`(`a_id`)
 );
 
  -- recipient
 CREATE TABLE `blood_donation`.`blood_request`(
 `req_id` INT NOT NULL AUTO_INCREMENT, 
`nid_birthCtf` BIGINT(20) NOT NULL,
`uid` INT NOT NULL ,
`blood_group` VARCHAR(3) NOT NULL,
`phone_no` BIGINT(15) NOT NULL,
`a_id` INT NOT NULL,
 `donor` INT NULL ,
 `completed` INT NOT NULL DEFAULT 0,
 PRIMARY KEY (`req_id`),
 FOREIGN KEY (`uid`) REFERENCES `blood_donation`.`users`(`uid`),
 FOREIGN KEY (`a_id`) REFERENCES `blood_donation`.`address`(`a_id`)
 );
 
 -- address table
CREATE TABLE `blood_donation`.`address` (
  `a_id` INT NOT NULL AUTO_INCREMENT,
  `building` VARCHAR(45) NULL,
  `village_road` VARCHAR(45) NULL,
  `post_office` VARCHAR(45) NULL,
  `city` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `longitude` DECIMAL(4,2) NULL,
  `latitude` DECIMAL(4,2) NULL,
  PRIMARY KEY (`a_id`));
  
  
-- medical center
CREATE TABLE `blood_donation`.`medical_centre` (
  `m_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone_no` BIGINT(12) NULL,
  `a_id` INT NOT NULL,
  `verified` TINYINT(1) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`m_id`),
  INDEX `address_idx` (`a_id` ASC) VISIBLE,
  CONSTRAINT `address`
    FOREIGN KEY (`a_id`)
    REFERENCES `blood_donation`.`address` (`a_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
    
    
-- medical history
CREATE TABLE `blood_donation`.`medical_history`(
`uid` INT NOT NULL,
 `last_checked` DATETIME NOT NULL,
 `checked_at` INT NOT NULL,
 `physical_illness` LONGTEXT NULL,
 `genetical_issues` LONGTEXT NULL,
 FOREIGN KEY (`uid`) REFERENCES `blood_donation`.`users`(`uid`),
 FOREIGN KEY (`checked_at`) REFERENCES `blood_donation`.`address`(`a_id`)
);

-- ambulance
CREATE TABLE `blood_donation`.`ambulance`(
`vehicle_id` INT NOT NULL AUTO_INCREMENT,
`organization` INT NOT NULL,
`phone_no` BIGINT(12) NULL,
PRIMARY KEY (`vehicle_id`),
FOREIGN KEY (`organization`) REFERENCES `blood_donation`.`medical_centre`(`m_id`)
);

-- driver
CREATE TABLE `blood_donation`.`driver`(
`driving_license` BIGINT(20) NOT NULL ,
 `first_name` VARCHAR(20) NOT NULL,
 `last_name` VARCHAR(20) NOT NULL,
 `phone_no` BIGINT(12) NOT NULL,
 `station` INT NOT NULL,
 `a_id` INT NOT NULL,
 `verified` INT NOT NULL DEFAULT 0,
PRIMARY KEY (`driving_license`),
FOREIGN KEY (`station`) REFERENCES `blood_donation`.`medical_centre`(`m_id`),
FOREIGN KEY (`a_id`) REFERENCES `blood_donation`.`address`(`a_id`)
);


-- otherOrg
CREATE TABLE `blood_donation`.`otherOrg` (
`org_id` INT NOT NULL AUTO_INCREMENT,
`org_name` VARCHAR(20) NOT NULL,
`org branch` VARCHAR(20) NOT NULL,
`hotline` BIGINT(12) NULL,
PRIMARY KEY (`org_id`)
);

 -- donations
CREATE TABLE `blood_donation`.`donations` (
`id` INT NOT NULL AUTO_INCREMENT,
`recipient_id` INT NOT NULL ,
 `donor_id` INT NOT NULL,
 `date_donated` DATETIME NOT NULL,
 `medical_centre` INT NOT NULL,
 `status` VARCHAR(20) NOT NULL,
 PRIMARY KEY (`id`),
 FOREIGN KEY (`recipient_id`) REFERENCES `blood_donation`.`recipient`(`uid`),
 FOREIGN KEY (`donor_id`) REFERENCES `blood_donation`.`donor`(`uid`),
 FOREIGN KEY (`medical_centre`) REFERENCES `blood_donation`.`medical_centre`(`m_id`)
 );
CREATE TABLE `blood_donation`.`notification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(100) NULL,
  `blood_request` INT NOT NULL,
  `sender` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sender`) REFERENCES `blood_donation`.`users`(`uid`),
  FOREIGN KEY (`blood_request`) REFERENCES `blood_donation`.`blood_request`(`req_id`)) 
  ;
  
  CREATE TABLE `blood_donation`.`notification_reciever` (
  `notification_id` INT NOT NULL,
  `reciever` INT NOT NULL,
  `seen` TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (`notification_id`) REFERENCES `blood_donation`.`notification`(`id`),
  FOREIGN KEY (`reciever`) REFERENCES `blood_donation`.`users`(`uid`)
  );


  
  