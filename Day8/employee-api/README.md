# Employee Management REST API

A RESTful API built using Node.js and Express.js to perform CRUD operations on employee records.

## Technologies Used
- Node.js
- Express.js
- JavaScript
- REST API
- In-memory data storage

## Features
- Get all employees
- Get employee by ID
- Create a new employee
- Update employee details
- Delete an employee
- Input validation
- Centralized error handling
- HTTP status codes

## Project Structure
```text
employee-api/
├── src/
│   ├── controllers/
│   │   └── employeeController.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── routes/
│   │   └── employeeRoutes.js
│   ├── services/
│   │   └── employeeService.js
│   └── server.js
├── package.json
└── README.md
```

## Installation

```bash
npm install
npm run dev
```

Server URL: `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

## Example POST Request

Endpoint: `POST /api/employees`

```json
{
  "name": "Sneha Deshmukh",
  "email": "sneha@example.com",
  "department": "Development",
  "salary": 45000
}
```

## HTTP Status Codes

- 200 – OK
- 201 – Created
- 400 – Bad Request
- 404 – Not Found
- 500 – Internal Server Error

## Error Handling

The project uses centralized error-handling middleware to manage unknown routes and application errors.

## Data Storage

Employee records are stored in an in-memory JavaScript array. Data resets when the server restarts. No database is connected.

## Learning Outcome

Built a REST API with resource-based routes, controller/service separation, middleware, CRUD operations, request validation, and centralized error handling.
