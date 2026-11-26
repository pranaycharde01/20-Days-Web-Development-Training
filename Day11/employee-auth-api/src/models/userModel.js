
const pool = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT user_id, name, email, password_hash, role
     FROM users
     WHERE email = $1`,
    [email.toLowerCase().trim()]
  );

  return result.rows[0];
};

// Find user by ID
const findUserById = async (userId) => {
  const result = await pool.query(
    `SELECT user_id, name, email, role
     FROM users
     WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};

// Create a new user
const createUser = async ({
  name,
  email,
  passwordHash,
  role = "student",
}) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING user_id, name, email, role, created_at`,
    [
      name.trim(),
      email.toLowerCase().trim(),
      passwordHash,
      role,
    ]
  );

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
