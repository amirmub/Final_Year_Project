const express = require("express");
const router = express.Router();
const titleController = require("../controllers/titleController");
const authMiddleware = require("../middleware/authMiddleware"); 

// routes to create user
router.post("/titles", authMiddleware.tokenVerify, titleController.createTitle);

// routes to get all titles
router.get("/titles", [authMiddleware.tokenVerify,authMiddleware.isAdmin], titleController.getAllTitles);

module.exports = router;