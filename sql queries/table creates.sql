-- adress table
CREATE TABLE `blood_donation`.`adress` (
  `a_id` INT NOT NULL AUTO_INCREMENT,
  `building` VARCHAR(45) NULL,
  `village_road` VARCHAR(45) NULL,
  `post_office` VARCHAR(45) NULL,
  `city` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `longitude` DECIMAL(4,2) NULL,
  `lattitude` DECIMAL(4,2) NULL,
  PRIMARY KEY (`a_id`));
  
  -- user table 
  CREATE TABLE `blood_donation`.`users` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `blood_group` VARCHAR(3) NOT NULL,
  `a_id` INT NOT NULL,
  `phone_no` BIGINT(15) NULL,
  `is_admin` TINYINT(1) UNSIGNED NULL DEFAULT 0,
  `password` TEXT NOT NULL,
  PRIMARY KEY (`uid`),
  INDEX `a_id_idx` (`a_id` ASC) INVISIBLE,
  CONSTRAINT `a_id`
    FOREIGN KEY (`a_id`)
    REFERENCES `blood_donation`.`adress` (`a_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
-- email added unique
ALTER TABLE `blood_donation`.`users` 
ADD COLUMN `email` VARCHAR(60) NOT NULL AFTER `last_name`,
ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE;
;
    
    
  
  