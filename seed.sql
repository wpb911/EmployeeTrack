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

-- View All Employees main 
select emp.first_name, emp.last_name, role.title, name as Department, salary, concat(mgr.first_name, ' ' ,mgr.last_name) as Manager
from employee emp 
left join employee mgr on mgr.id = emp.manager_id
left join role on emp.role_id = role.id
left join department on role.department_id = department.id;


-- view all employees
select distinct first_name, last_name, role.title, department.name as 'department', role.salary, manager.manager 
from employee
left join role on employee.role_id = role.id
left join department on role.department_id = department.id
left join manager on employee.manager_id = manager.manager_id;

-- View all employees by department 

select emp.first_name, emp.last_name, role.title, name as Department, salary, concat(mgr.first_name, ' ' ,mgr.last_name) as Manager
from employee emp 
left join employee mgr on mgr.id = emp.manager_id
left join role on emp.role_id = role.id
left join department on role.department_id = department.id
order by department;

-- View all employees by manager

select emp.first_name, emp.last_name, role.title, name as Department, salary, concat(mgr.first_name, ' ' ,mgr.last_name) as Manager
from employee emp 
left join employee mgr on mgr.id = emp.manager_id
left join role on emp.role_id = role.id
left join department on role.department_id = department.id
order by emp.manager_id desc;

-- View Managers

select concat(emp.first_name, ' ', emp.last_name) as employee, concat(mgr.first_name, ' ' ,mgr.last_name) as manager
from employee emp 
inner join employee mgr on mgr.id = emp.manager_id;
 
-- View Departments
select id as DepartmentID, name as Departments from department;

-- View Roles
select id as RoleID, title as Role from role;;

-- View the total utilized budget of all departments
select role.department_id as DepartmentID, department.name as Department, sum(role.salary) as Budget
from role
inner join department on role.department_id = department.id
group by role.department_id;

--View budget of a specific department 2
select role.department_id as DepartmentID, department.name as Department, sum(role.salary) as Budget
from role
inner join department on role.department_id = department.id
where role.department_id = 3
group by role.department_id;





 