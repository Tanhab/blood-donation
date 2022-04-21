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

-- medical center
CREATE TABLE `blood_donation`.`medical_centre` (
  `m_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone_no` BIGINT(12) NULL,
  `a_id` INT NOT NULL,
  `verified` TINYINT(1) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`m_id`),
  INDEX `adress_idx` (`a_id` ASC) VISIBLE,
  CONSTRAINT `adress`
    FOREIGN KEY (`a_id`)
    REFERENCES `blood_donation`.`adress` (`a_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `blood_donation`.`medical_history`(
`uid` INT NOT NULL,
 `last_checked` DATETIME NOT NULL,
 `checked_at` INT NOT NULL,
 `physical_illness` LONGTEXT NULL,
 `genetical_issues` LONGTEXT NULL,
 FOREIGN KEY (uid) REFERENCES users(uid),
 FOREIGN KEY (checked_at) REFERENCES adress(a_id)
)



    
    
  
  