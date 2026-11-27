
const employeeModel = require("../models/employeeModel");

const validId = (id) =>
  /^\d+$/.test(id) && Number(id) > 0;

const validateEmployee = (body) => {
  const {
    employee_name,
    email,
    salary,
    department_id,
    employee_status,
  } = body;

  if (
    !employee_name ||
    !email ||
    salary === undefined ||
    department_id === undefined
  ) {
    return "Employee name, email, salary and department ID are required";
  }

  if (
    typeof employee_name !== "string" ||
    !employee_name.trim()
  ) {
    return "Employee name must be valid";
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return "Please enter a valid email";
  }

  if (
    typeof salary !== "number" ||
    !Number.isFinite(salary) ||
    salary < 0
  ) {
    return "Salary must be a non-negative number";
  }

  if (
    !Number.isInteger(department_id) ||
    department_id <= 0
  ) {
    return "Department ID must be a positive integer";
  }

  if (
    employee_status !== undefined &&
    !["Active", "Inactive", "On Leave"].includes(employee_status)
  ) {
    return "Invalid employee status";
  }

  return null;
};

// GET all employees with pagination
const getEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be positive and limit must be between 1 and 100",
      });
    }

    const offset = (page - 1) * limit;

    const employees = await employeeModel.getAllEmployees(
      limit,
      offset
    );

    const total = await employeeModel.getEmployeeCount();

    res.status(200).json({
      success: true,
      data: employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

// GET employee by ID
const getEmployee = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const employee = await employeeModel.getEmployeeById(
      Number(req.params.id)
    );

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
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee",
    });
  }
};

// POST create employee
const createEmployee = async (req, res) => {
  try {
    const validationError = validateEmployee(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const employee = await employeeModel.createEmployee({
      ...req.body,
      employee_name: req.body.employee_name.trim(),
      email: req.body.email.trim(),
      employee_status: req.body.employee_status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message: "Department ID does not exist",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};

// PUT update employee
const updateEmployee = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const validationError = validateEmployee(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const employee = await employeeModel.updateEmployee(
      Number(req.params.id),
      {
        ...req.body,
        employee_name: req.body.employee_name.trim(),
        email: req.body.email.trim(),
        employee_status: req.body.employee_status || "Active",
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message: "Department ID does not exist",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update employee",
    });
  }
};

// DELETE employee
const deleteEmployee = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const employee = await employeeModel.deleteEmployee(
      Number(req.params.id)
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete employee",
    });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
