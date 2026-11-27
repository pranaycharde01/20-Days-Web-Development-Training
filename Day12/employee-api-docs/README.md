# Employee Management API

A RESTful Employee Management API built using Node.js, Express.js and PostgreSQL. This project demonstrates CRUD operations, input validation, pagination, API documentation and automated testing.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- node-postgres (pg)
- Swagger UI / OpenAPI
- Jest and Supertest
- dotenv
- Nodemon

## Features

- PostgreSQL connection pooling
- Employee CRUD operations
- Input validation and duplicate email prevention
- Parameterized SQL queries
- Pagination with page and limit parameters
- API documentation using Swagger UI
- Automated API testing
- SQL database migrations

## Installation

```bash
npm install
```

Create a `.env` file in the project root with your PostgreSQL configuration.

Never commit your `.env` file.

## Run the Application

```bash
npm run dev
```

Server URL:

`http://localhost:5000`

## API Documentation

Swagger UI:

`http://localhost:5000/api-docs/`

The documentation includes request parameters, employee schema and available API endpoints.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API health check |
| GET | `/api/health` | Database health check |
| GET | `/api/employees` | Get employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

## Pagination

Example:

`GET /api/employees?page=1&limit=5`

- `page`: Page number (default: 1)
- `limit`: Records per page (default: 10, maximum: 100)

The response includes employee data and pagination information.

## Automated Testing

Run tests using:

```bash
npm test
```

Testing tools:
- Jest
- Supertest

Test coverage includes:
- API health check
- Employee listing
- Invalid employee ID
- Missing employee resource
- Invalid employee input

**Latest test result:** 5 tests passed.

## Project Structure

```text
employee-api-docs/
├── migrations/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── swagger.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   │   └── employeeRoutes.js
│   └── server.js
├── tests/
│   └── employee.test.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Author

Pranay Charde

## Learning Outcome

Developed practical experience with REST API development, PostgreSQL integration, API documentation using OpenAPI/Swagger, pagination, validation and automated testing.