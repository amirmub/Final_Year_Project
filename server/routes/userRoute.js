const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// routes to create user
router.post("/users",userController.createUser);

// routes to get all users
router.get("/users",userController.getAllUsers);

module.exports = router;