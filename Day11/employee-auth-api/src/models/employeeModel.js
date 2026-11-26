
const pool = require("../config/db");

const getAllEmployees = async () => {
  const result = await pool.query(
    "SELECT * FROM employees ORDER BY employee_id ASC"
  );
  return result.rows;
};

const getEmployeeById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM employees WHERE employee_id = $1",
    [id]
  );
  return result.rows[0];
};

const createEmployee = async (employee) => {
  const {
    employee_name,
    email,
    salary,
    department_id,
    employee_status = "Active",
  } = employee;

  const result = await pool.query(
    `INSERT INTO employees
     (employee_name, email, salary, department_id, employee_status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [employee_name, email, salary, department_id, employee_status]
  );

  return result.rows[0];
};

const updateEmployee = async (id, employee) => {
  const {
    employee_name,
    email,
    salary,
    department_id,
    employee_status,
  } = employee;

  const result = await pool.query(
    `UPDATE employees
     SET employee_name = $1,
         email = $2,
         salary = $3,
         department_id = $4,
         employee_status = $5
     WHERE employee_id = $6
     RETURNING *`,
    [employee_name, email, salary, department_id, employee_status, id]
  );

  return result.rows[0];
};

const deleteEmployee = async (id) => {
  const result = await pool.query(
    "DELETE FROM employees WHERE employee_id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
