-- Create employee_track database and tables  
drop database if exists employee_track;

create database employee_track;

use employee_track;

create table employee(
    id integer not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer not null,
    manager_id integer,
    primary key (id)
);

create table role(
    id integer not null auto_increment,
    title varchar(30) not null,
    salary decimal not null,
    department_id integer not null,
    primary key (id)
);

create table department(
    id integer not null auto_increment,
    name varchar(30) not null,    
    primary key (id)
);




-- Add intial data for the employee_track tables

INSERT INTO employee (first_name, last_name, role_id)
 VALUES  ("John", "Doe", 1), ("Mike", "Chan", 2),("Ashley", "Rodriguez", 3),
 ("Kevin", "Tupik", 4), ("Malia", "Brown", 5), ("Sarah", "Lourd", 6),
 ("Tom", "Allen", 6), ("Christian", "Eckenrode", 3);

INSERT INTO role (title, salary, department_id)
 VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), 
 ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2),("Account", 125000, 3),
 ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4), ("Lead Engineer", 150000, 2),;
 
 INSERT INTO department (name)
 VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");