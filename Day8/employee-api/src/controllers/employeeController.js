
const employeeService = require("../services/employeeService");

// GET all employees
function getAllEmployees(req, res) {
  const employees = employeeService.getAllEmployees();

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
}

// GET employee by ID
function getEmployeeById(req, res) {
  const employee = employeeService.getEmployeeById(req.params.id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    data: employee,
  });
}

// CREATE employee
function createEmployee(req, res) {
  const { name, email, department, salary } = req.body;

  if (!name || !email || !department || salary === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, department and salary",
    });
  }

  if (
    typeof salary !== "number" ||
    !Number.isFinite(salary) ||
    salary < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Salary must be a valid non-negative number",
    });
  }

  const newEmployee = employeeService.createEmployee({
    name,
    email,
    department,
    salary,
  });

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: newEmployee,
  });
}

// UPDATE employee
function updateEmployee(req, res) {
  const { name, email, department, salary } = req.body;

  if (
    salary !== undefined &&
    (typeof salary !== "number" ||
      !Number.isFinite(salary) ||
      salary < 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Salary must be a valid non-negative number",
    });
  }

  // Keep only fields provided in the request
  const employeeData = Object.fromEntries(
    Object.entries({ name, email, department, salary }).filter(
      ([key, value]) => value !== undefined
    )
  );

  const updatedEmployee = employeeService.updateEmployee(
    req.params.id,
    employeeData
  );

  if (!updatedEmployee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: updatedEmployee,
  });
}

// DELETE employee
function deleteEmployee(req, res) {
  const deletedEmployee = employeeService.deleteEmployee(req.params.id);

  if (!deletedEmployee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
    data: deletedEmployee,
  });
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
