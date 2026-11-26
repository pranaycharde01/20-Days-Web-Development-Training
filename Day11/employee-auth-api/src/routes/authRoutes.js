
const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const userModel = require("../models/userModel");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Public route: Register
router.post("/register", register);

// Public route: Login
router.post("/login", login);

// Protected route: Get logged-in user's profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
});

// Protected route: Admin only
router.get(
  "/admin",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the admin dashboard",
      user: req.user,
    });
  }
);

module.exports = router;
