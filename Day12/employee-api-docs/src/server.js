
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger API documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee PostgreSQL API is running",
  });
});

// Database health check
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "API and PostgreSQL are connected",
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Employee routes
app.use("/api/employees", employeeRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server only when running this file directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for Supertest
module.exports = app;
