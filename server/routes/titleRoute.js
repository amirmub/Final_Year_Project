const express = require("express");
const router = express.Router({ mergeParams: true });
const titleController = require("../controllers/titleController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE title (nested under user)
router.post("/", authMiddleware.tokenVerify, titleController.createTitle);

// GET all titles (admin only)
router.get("/", [authMiddleware.tokenVerify, authMiddleware.isAdmin], titleController.getAllTitles);

// GET single title
router.get("/:id", authMiddleware.tokenVerify, titleController.getTitle);

// DELETE title (admin only)
router.delete("/:id", [authMiddleware.tokenVerify, authMiddleware.isAdmin], titleController.deleteTitle);

module.exports = router;
