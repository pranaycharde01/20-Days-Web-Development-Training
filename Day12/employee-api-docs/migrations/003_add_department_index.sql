-- Migration 003: Add index for department-based employee lookup

CREATE INDEX IF NOT EXISTS idx_employees_department_id
ON employees(department_id);