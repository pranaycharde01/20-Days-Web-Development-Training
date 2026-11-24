
-- Migration 002: Add employee status

ALTER TABLE employees
ADD COLUMN IF NOT EXISTS employee_status VARCHAR(20)
DEFAULT 'Active'
NOT NULL;

-- Add a constraint for valid employee statuses
ALTER TABLE employees
ADD CONSTRAINT chk_employee_status
CHECK (employee_status IN ('Active', 'Inactive', 'On Leave'));
