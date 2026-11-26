
-- =====================================================
-- Migration 004: Create Users Table
-- Project: Employee Authentication API
-- Purpose: Store user accounts for authentication
-- =====================================================

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'student'
        CHECK (role IN ('student', 'admin')),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster email-based login
CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

-- Verify users table structure
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'users'
ORDER BY ordinal_position;

-- Verify email index
SELECT indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'users';
