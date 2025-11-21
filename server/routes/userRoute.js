const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); 
const titleRoute = require("./titleRoute");

// Nested route: all title routes are under /users/:userId/titles
router.use("/users/:userId/titles", titleRoute);

// Create user
router.post("/users", userController.createUser);

// Get all users (admin only)
router.get("/users", [authMiddleware.tokenVerify, authMiddleware.isAdmin], userController.getAllUsers);

// Get a single user
router.get("/users/:id", [authMiddleware.tokenVerify, authMiddleware.isAdmin], userController.getUser);

// Get a Update user
router.put("/users/:id", [authMiddleware.tokenVerify, authMiddleware.isAdmin], userController.updateUser);

// Get a Delete user
router.delete("/users/:id", [authMiddleware.tokenVerify, authMiddleware.isAdmin], userController.deleteUser);

module.exports = router;
