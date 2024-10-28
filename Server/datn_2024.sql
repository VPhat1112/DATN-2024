CREATE TABLE `datn_2024`.`account` (
    `account_id` CHAR(7) NOT NULL , 
    `email` VARCHAR(20) NOT NULL , 
    `password` VARCHAR(50) NOT NULL , 
    `role_id` CHAR(7) NOT NULL , 
    PRIMARY KEY (`account_id`)
) ENGINE = InnoDB;