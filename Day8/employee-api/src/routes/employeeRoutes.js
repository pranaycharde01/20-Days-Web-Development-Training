const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");

// GET /api/employees
router.get("/", employeeController.getAllEmployees);

// GET /api/employees/:id
router.get("/:id", employeeController.getEmployeeById);

// POST /api/employees
router.post("/", employeeController.createEmployee);

// PUT /api/employees/:id
router.put("/:id", employeeController.updateEmployee);

// DELETE /api/employees/:id
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;