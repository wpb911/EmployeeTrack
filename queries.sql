-- Queries for employee track database 

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

-- View all employees that have a manager 

select emp.first_name, emp.last_name, role.title, name as Department, salary, concat(mgr.first_name, ' ' ,mgr.last_name) as Manager
from employee emp 
left join employee mgr on mgr.id = emp.manager_id
left join role on emp.role_id = role.id
left join department on role.department_id = department.id
where emp.manager_id is not null;

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
