
const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - employee_name
 *         - email
 *         - salary
 *         - department_id
 *       properties:
 *         employee_id:
 *           type: integer
 *           example: 1
 *         employee_name:
 *           type: string
 *           example: Asha Kulkarni
 *         email:
 *           type: string
 *           example: asha@example.com
 *         salary:
 *           type: number
 *           example: 70000
 *         department_id:
 *           type: integer
 *           example: 1
 *         employee_status:
 *           type: string
 *           enum: [Active, Inactive, On Leave]
 *           example: Active
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees with pagination
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of employees per page
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       400:
 *         description: Invalid pagination parameters
 *       500:
 *         description: Server error
 */
router.get("/", getEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       400:
 *         description: Invalid employee ID
 *       404:
 *         description: Employee not found
 */
router.get("/:id", getEmployee);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid employee data
 *       409:
 *         description: Email already exists
 */
router.post("/", createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid employee data or ID
 *       404:
 *         description: Employee not found
 *       409:
 *         description: Email already exists
 */
router.put("/:id", updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       400:
 *         description: Invalid employee ID
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", deleteEmployee);

module.exports = router;
