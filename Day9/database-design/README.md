
# Day 9 – PostgreSQL and Data Modeling

## Project: Employee Management System

### Overview
This project demonstrates relational database design and SQL operations using PostgreSQL.

It manages departments, employees, projects, and employee-project assignments.

### Technologies Used
- PostgreSQL 19
- SQL
- Visual Studio Code
- Microsoft PostgreSQL Extension

### Project Structure

```text
database-design/
│
├── er-diagram.md
├── schema.sql
├── queries.sql
├── README.md
│
└── migrations/
    └── 002_add_employee_status.sql
```

### Database Tables

1. departments
2. employees
3. projects
4. employee_projects

### Concepts Covered

- Primary Keys and Foreign Keys
- UNIQUE, NOT NULL and CHECK constraints
- Database indexes
- One-to-Many and Many-to-Many relationships
- INSERT, SELECT and UPDATE
- INNER JOIN and LEFT JOIN
- GROUP BY and aggregate functions
- Transactions using COMMIT and ROLLBACK
- Parameterized queries using PREPARE and EXECUTE
- Database migrations using ALTER TABLE

### Database Features

- Employee and department management
- Project assignment tracking
- Employee salary summaries
- Department-wise employee reports
- Employee status tracking

### Files

- `er-diagram.md` – Database relationship documentation
- `schema.sql` – Database tables, constraints and indexes
- `queries.sql` – Sample data and SQL practice queries
- `migrations/` – Database structure changes

### Learning Outcome

Designed a relational database, created SQL queries, practiced joins and transactions, and implemented a database migration using PostgreSQL.
