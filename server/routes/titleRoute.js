const express = require("express");
const router = express.Router();
const titleController = require("../controllers/titleController");
const authMiddleware = require("../middleware/authMiddleware"); 

// routes to create user
router.post("/titles", authMiddleware.tokenVerify, titleController.createTitle);

// routes to get all titles
router.get("/titles", [authMiddleware.tokenVerify,authMiddleware.isAdmin], titleController.getAllTitles);

// routes to get all titles
router.get("/titles/:id", [authMiddleware.tokenVerify], titleController.getTitle);

// routes to get all titles
router.delete("/titles/:id", [authMiddleware.tokenVerify,authMiddleware.isAdmin], titleController.deleteTitle);

module.exports = router;