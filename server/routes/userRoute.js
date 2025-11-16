const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); 

// routes to create user
router.post("/users", userController.createUser);

// routes to get all users
router.get("/users", [authMiddleware.tokenVerify,authMiddleware.isAdmin], userController.getAllUsers);

module.exports = router;