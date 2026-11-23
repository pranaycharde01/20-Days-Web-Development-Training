let employees = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    department: "IT",
    salary: 35000,
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@example.com",
    department: "HR",
    salary: 30000,
  },
  {
    id: 3,
    name: "Amit Patil",
    email: "amit@example.com",
    department: "Finance",
    salary: 40000,
  },
];

// Get all employees
function getAllEmployees() {
  return employees;
}

// Get employee by ID
function getEmployeeById(id) {
  return employees.find((employee) => employee.id === Number(id));
}

// Create employee
function createEmployee(employeeData) {
  const newEmployee = {
    id:
      employees.length > 0
        ? Math.max(...employees.map((employee) => employee.id)) + 1
        : 1,
    ...employeeData,
  };

  employees.push(newEmployee);
  return newEmployee;
}

// Update employee
function updateEmployee(id, employeeData) {
  const employee = getEmployeeById(id);

  if (!employee) {
    return null;
  }

  Object.assign(employee, employeeData);
  return employee;
}

// Delete employee
function deleteEmployee(id) {
  const employeeIndex = employees.findIndex(
    (employee) => employee.id === Number(id)
  );

  if (employeeIndex === -1) {
    return null;
  }

  const deletedEmployee = employees.splice(employeeIndex, 1);
  return deletedEmployee[0];
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};