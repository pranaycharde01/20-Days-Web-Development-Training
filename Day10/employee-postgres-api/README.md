
# Employee PostgreSQL API

A RESTful Employee Management API built using Node.js, Express.js and PostgreSQL. This project demonstrates database integration, CRUD operations, validation, SQL migrations and automated API testing.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- node-postgres (pg)
- dotenv
- Jest
- Supertest
- Nodemon

## Features

- PostgreSQL connection pooling
- Environment variable configuration
- Create, read, update and delete employees
- Parameterized SQL queries
- Input validation
- Duplicate email prevention
- Foreign key validation
- Centralized API route handling
- Automated API tests using Jest and Supertest
- SQL database migrations

## Project Structure

```text
employee-postgres-api/
├── migrations/
│   ├── 001_create_employees.sql
│   ├── 002_check_employees.sql
│   └── 003_add_department_index.sql
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── testConnection.js
│   ├── controllers/
│   │   └── employeeController.js
│   ├── middleware/
│   ├── models/
│   │   └── employeeModel.js
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

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
```

Never commit your `.env` file.

## Run the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server URL:

```text
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | API health check |
| GET | /api/health | Database health check |
| GET | /api/employees | Get all employees |
| GET | /api/employees/:id | Get employee by ID |
| POST | /api/employees | Create employee |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |

## Sample Request Body

```json
{
  "employee_name": "Priya Sharma",
  "email": "priya@example.com",
  "salary": 52000,
  "department_id": 1,
  "employee_status": "Active"
}
```

Allowed employee statuses:

- Active
- Inactive
- On Leave

## Database

The application uses PostgreSQL with a connection pool.

Parameterized queries help protect against SQL injection.

The employee table uses:

- Primary key
- Unique email constraint
- Foreign key for department
- Salary validation
- Employee status validation

## Database Migrations

SQL migration files are available in the `migrations` folder.

Execute the required SQL statements using PostgreSQL.

## Automated Testing

Run the test suite:

```bash
npm test
```

Testing tools:

- Jest
- Supertest

Current automated tests cover API health, employee listing, invalid IDs, missing employees and invalid input.

## Author

Pranay Charde

## Learning Outcome

This project was developed as part of a 20-day Web Development Training Program.

It demonstrates practical experience with Express.js, PostgreSQL integration, REST APIs, database validation, migrations and automated testing.
