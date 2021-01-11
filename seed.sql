create database employee_track;
use employee_track;
create table employee(
    id integer not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer,
    manager_id integer,
    primary key (id)
);

create table role(
    id integer not null auto_increment,
    title varchar(30) not null,
    salary decimal not null,
    department_id integer,
    primary key (id)
);

create table department(
    id integer not null auto_increment,
    name varchar(30) not null,    
    primary key (id)
);

create table manager(    
    manager_id integer,    
    managed_id integer,    
    manager varchar(60)
);

INSERT INTO employee (first_name, last_name, role_id)
 VALUES  ("John", "Doe", 1), ("Mike", "Chan", 2),("Ashley", "Rodriguez", 3),
 ("Kevin", "Tupik", 4), ("Malia", "Brown", 5), ("Sarah", "Lourd", 6),
 ("Tom", "Allen", 7), ("Christian", "Eckenrode", 3);

INSERT INTO manager (employee_id, manager_id, manager)
 VALUES (1, 3, "Ashley Rodriguez"), (2, 1, "John Doe"), (7, 6, "Sarah Lourd"),
 (8, 2, "Mike Chan"), (4, 3, "Ashley Rodriguez");

 INSERT INTO manager (employee_id) 
 values (5), (6), (3);

INSERT INTO role (title, salary, department_id)
 VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), 
 ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2),("Account", 125000, 3),
 ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4), ("Lead Engineer", 150000, 2),;
 
 INSERT INTO department (name)
 VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");
 
 