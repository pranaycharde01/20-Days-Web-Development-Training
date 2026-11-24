
-- ==========================================
-- DAY 9: POSTGRESQL PRACTICE QUERIES
-- Employee Management System
-- ==========================================


-- 1. View all departments
SELECT * FROM departments;


-- 2. View all employees
SELECT * FROM employees;


-- 3. View all projects
SELECT * FROM projects;


-- 4. View employee-project assignments
SELECT * FROM employee_projects;


-- 5. Insert sample employees
INSERT INTO employees (employee_name, email, salary, department_id)
VALUES
    ('Asha Kulkarni', 'asha@example.com', 65000, 1),
    ('Rohan Patil', 'rohan@example.com', 55000, 2),
    ('Neha Deshmukh', 'neha@example.com', 72000, 1),
    ('Kunal Shah', 'kunal@example.com', 60000, 3)
ON CONFLICT (email) DO NOTHING;


-- 6. Insert sample projects
INSERT INTO projects (project_name, start_date, end_date)
VALUES
    ('Employee Portal', '2026-01-15', '2026-12-31'),
    ('Payroll Automation', '2026-02-01', '2026-10-31'),
    ('Data Analytics', '2026-03-01', '2026-11-30')
ON CONFLICT (project_name) DO NOTHING;


-- 7. Assign employees to projects
INSERT INTO employee_projects (employee_id, project_id, assigned_date)
VALUES
    (1, 1, '2026-01-20'),
    (2, 2, '2026-02-05'),
    (3, 1, '2026-01-22'),
    (4, 3, '2026-03-05'),
    (1, 3, '2026-03-10')
ON CONFLICT (employee_id, project_id) DO NOTHING;


-- 8. INNER JOIN: Employees and departments
SELECT
    employees.employee_name,
    employees.email,
    employees.salary,
    departments.department_name
FROM employees
INNER JOIN departments
ON employees.department_id = departments.department_id;


-- 9. INNER JOIN: Employees and projects
SELECT
    employees.employee_name,
    projects.project_name,
    employee_projects.assigned_date
FROM employee_projects
INNER JOIN employees
ON employee_projects.employee_id = employees.employee_id
INNER JOIN projects
ON employee_projects.project_id = projects.project_id
ORDER BY employees.employee_name;


-- 10. LEFT JOIN: All employees and their projects
SELECT
    employees.employee_name,
    projects.project_name
FROM employees
LEFT JOIN employee_projects
ON employees.employee_id = employee_projects.employee_id
LEFT JOIN projects
ON employee_projects.project_id = projects.project_id
ORDER BY employees.employee_name;


-- 11. Average salary by department
SELECT
    departments.department_name,
    COUNT(employees.employee_id) AS total_employees,
    AVG(employees.salary) AS average_salary
FROM departments
LEFT JOIN employees
ON departments.department_id = employees.department_id
GROUP BY departments.department_name
ORDER BY departments.department_name;


-- 12. Department salary summary
SELECT
    departments.department_name,
    COUNT(employees.employee_id) AS total_employees,
    COALESCE(SUM(employees.salary), 0) AS total_salary,
    MAX(employees.salary) AS highest_salary
FROM departments
LEFT JOIN employees
ON departments.department_id = employees.department_id
GROUP BY departments.department_name
ORDER BY total_salary DESC;


-- 13. Employee detail by ID
SELECT
    employees.employee_id,
    employees.employee_name,
    employees.email,
    employees.salary,
    departments.department_name
FROM employees
INNER JOIN departments
ON employees.department_id = departments.department_id
WHERE employees.employee_id = 1;


-- 14. List employees earning more than 60000
SELECT employee_name, salary
FROM employees
WHERE salary > 60000
ORDER BY salary DESC;


-- 15. Count total employees
SELECT COUNT(*) AS total_employees
FROM employees;

-- ==========================================
-- 16. TRANSACTION EXAMPLE
-- ==========================================

BEGIN;

UPDATE employees
SET salary = salary + 5000
WHERE employee_id = 1;

-- Check the updated salary
SELECT employee_name, salary
FROM employees
WHERE employee_id = 1;

-- Save the change permanently
COMMIT;


-- ==========================================
-- 17. ROLLBACK EXAMPLE
-- ==========================================


-- =====================================================
-- DAY 9: POSTGRESQL AND DATA MODELING
-- Project: Employee Management System
-- File: queries.sql
-- =====================================================


-- =====================================================
-- 1. INSERT SAMPLE DEPARTMENTS
-- =====================================================

INSERT INTO departments (department_name, location)
VALUES
    ('IT', 'Amravati'),
    ('HR', 'Nagpur'),
    ('Finance', 'Pune')
ON CONFLICT (department_name) DO NOTHING;


-- =====================================================
-- 2. INSERT SAMPLE EMPLOYEES
-- =====================================================

INSERT INTO employees (employee_name, email, salary, department_id)
VALUES
    ('Asha Kulkarni', 'asha@example.com', 65000, 1),
    ('Rohan Patil', 'rohan@example.com', 55000, 2),
    ('Neha Deshmukh', 'neha@example.com', 72000, 1),
    ('Kunal Shah', 'kunal@example.com', 60000, 3)
ON CONFLICT (email) DO NOTHING;


-- =====================================================
-- 3. INSERT SAMPLE PROJECTS
-- =====================================================

INSERT INTO projects (project_name, start_date, end_date)
VALUES
    ('Employee Portal', '2026-01-15', '2026-12-31'),
    ('Payroll Automation', '2026-02-01', '2026-10-31'),
    ('Data Analytics', '2026-03-01', '2026-11-30')
ON CONFLICT (project_name) DO NOTHING;


-- =====================================================
-- 4. ASSIGN EMPLOYEES TO PROJECTS
-- =====================================================

INSERT INTO employee_projects (employee_id, project_id, assigned_date)
VALUES
    (1, 1, '2026-01-20'),
    (2, 2, '2026-02-05'),
    (3, 1, '2026-01-22'),
    (4, 3, '2026-03-05'),
    (1, 3, '2026-03-10')
ON CONFLICT (employee_id, project_id) DO NOTHING;


-- =====================================================
-- 5. LIST VIEW: DISPLAY ALL DEPARTMENTS
-- =====================================================

SELECT *
FROM departments;


-- =====================================================
-- 6. LIST VIEW: DISPLAY ALL EMPLOYEES
-- =====================================================

SELECT *
FROM employees;


-- =====================================================
-- 7. LIST VIEW: DISPLAY ALL PROJECTS
-- =====================================================

SELECT *
FROM projects;


-- =====================================================
-- 8. DISPLAY EMPLOYEE-PROJECT ASSIGNMENTS
-- =====================================================

SELECT *
FROM employee_projects;


-- =====================================================
-- 9. INNER JOIN: EMPLOYEES AND DEPARTMENTS
-- =====================================================

SELECT
    employees.employee_name,
    employees.email,
    employees.salary,
    departments.department_name
FROM employees
INNER JOIN departments
ON employees.department_id = departments.department_id;


-- =====================================================
-- 10. INNER JOIN: EMPLOYEES AND PROJECTS
-- =====================================================

SELECT
    employees.employee_name,
    projects.project_name,
    employee_projects.assigned_date
FROM employee_projects
INNER JOIN employees
ON employee_projects.employee_id = employees.employee_id
INNER JOIN projects
ON employee_projects.project_id = projects.project_id
ORDER BY employees.employee_name;


-- =====================================================
-- 11. LEFT JOIN: ALL EMPLOYEES AND THEIR PROJECTS
-- =====================================================

SELECT
    employees.employee_name,
    projects.project_name
FROM employees
LEFT JOIN employee_projects
ON employees.employee_id = employee_projects.employee_id
LEFT JOIN projects
ON employee_projects.project_id = projects.project_id
ORDER BY employees.employee_name;


-- =====================================================
-- 12. SUMMARY: AVERAGE SALARY BY DEPARTMENT
-- =====================================================

SELECT
    departments.department_name,
    COUNT(employees.employee_id) AS total_employees,
    ROUND(AVG(employees.salary), 2) AS average_salary
FROM departments
LEFT JOIN employees
ON departments.department_id = employees.department_id
GROUP BY departments.department_name
ORDER BY departments.department_name;


-- =====================================================
-- 13. SUMMARY: DEPARTMENT SALARY DETAILS
-- =====================================================

SELECT
    departments.department_name,
    COUNT(employees.employee_id) AS total_employees,
    COALESCE(SUM(employees.salary), 0) AS total_salary,
    MAX(employees.salary) AS highest_salary
FROM departments
LEFT JOIN employees
ON departments.department_id = employees.department_id
GROUP BY departments.department_name
ORDER BY total_salary DESC;


-- =====================================================
-- 14. DETAIL VIEW: EMPLOYEE DETAILS BY ID
-- =====================================================

SELECT
    employees.employee_id,
    employees.employee_name,
    employees.email,
    employees.salary,
    departments.department_name
FROM employees
INNER JOIN departments
ON employees.department_id = departments.department_id
WHERE employees.employee_id = 1;


-- =====================================================
-- 15. FILTER EMPLOYEES BY SALARY
-- =====================================================

SELECT
    employee_name,
    salary
FROM employees
WHERE salary > 60000
ORDER BY salary DESC;


-- =====================================================
-- 16. COUNT TOTAL EMPLOYEES
-- =====================================================

SELECT COUNT(*) AS total_employees
FROM employees;


-- =====================================================
-- 17. TRANSACTION: COMMIT
-- =====================================================

BEGIN;

UPDATE employees
SET salary = 70000
WHERE employee_id = 1;

SELECT employee_name, salary
FROM employees
WHERE employee_id = 1;

COMMIT;


-- =====================================================
-- 18. TRANSACTION: ROLLBACK
-- =====================================================

BEGIN;

UPDATE employees
SET salary = 100000
WHERE employee_id = 2;

SELECT employee_name, salary
FROM employees
WHERE employee_id = 2;

ROLLBACK;


-- =====================================================
-- 19. PARAMETERIZED QUERY: EMPLOYEE BY ID
-- =====================================================

PREPARE get_employee_by_id (INTEGER) AS
SELECT
    employee_id,
    employee_name,
    email,
    salary
FROM employees
WHERE employee_id = $1;

EXECUTE get_employee_by_id(1);

DEALLOCATE get_employee_by_id;


-- =====================================================
-- 20. PARAMETERIZED QUERY: EMPLOYEES BY SALARY
-- =====================================================

PREPARE get_employees_by_salary (NUMERIC) AS
SELECT
    employee_name,
    salary
FROM employees
WHERE salary > $1;

EXECUTE get_employees_by_salary(60000);

DEALLOCATE get_employees_by_salary;


-- =====================================================
-- END OF DAY 9 SQL PRACTICE
-- =====================================================
