const express = require("express");

const employeeRoutes = require("./routes/employeeRoutes");

const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();
const PORT = 5000;

// Middleware to read JSON request bodies
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Management API is running",
  });
});

// Employee API routes
app.use("/api/employees", employeeRoutes);

// Handle unknown routes
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
