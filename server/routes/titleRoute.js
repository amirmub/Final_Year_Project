const express = require("express");
const router = express.Router({ mergeParams: true });
const titleController = require("../controllers/titleController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// CREATE title (nested under user)
router.post("/", authMiddleware.tokenVerify, upload.single("pdf"), titleController.createTitle);

// GET all titles
router.get("/", [authMiddleware.tokenVerify], titleController.getAllTitles);

// GET single title
router.get("/:id", authMiddleware.tokenVerify, titleController.getTitle);

// edit title 
router.put("/:id", authMiddleware.tokenVerify, titleController.updateTitle);

// DELETE title (admin only)
router.delete("/:id", [authMiddleware.tokenVerify, authMiddleware.isAdmin], titleController.deleteTitle);

module.exports = router;
