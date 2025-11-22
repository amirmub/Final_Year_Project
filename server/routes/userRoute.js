const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); 
const titleRoute = require("./titleRoute");

// Nested route: all title routes are under /users/:userId/titles
router.use("/users/:userId/titles", titleRoute);

// Create user
router.post("/users", userController.createUser);

// Get all users (admin)
router.get("/users", [authMiddleware.tokenVerify], userController.getAllUsers);

// Get a single user
router.get("/users/:id", [authMiddleware.tokenVerify], userController.getUser);

// Get a Update user
router.put("/users/:id", [authMiddleware.tokenVerify], userController.updateUser);

// Get a Delete user
router.delete("/users/:id", [authMiddleware.tokenVerify], userController.deleteUser);

module.exports = router;
