const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");
const authMiddleware = require("../middleware/authMiddleware");

// Create announcement
router.post("/announcement",[authMiddleware.tokenVerify, authMiddleware.isAdmin], announcementController.createAnnouncement);

// Get all announcement (admin only)
router.get("/announcement", [authMiddleware.tokenVerify], announcementController.getAllAnnouncement);

// Get a single announcement (admin only)
router.get("/announcement/:id", [authMiddleware.tokenVerify], announcementController.getAnnouncement);

// Update an  announcement (admin only)
router.put("/announcement/:id", [authMiddleware.tokenVerify, authMiddleware.isAdmin], announcementController.updateAnnouncement);

// Delete an announcement (admin only)
router.delete("/announcement/:id", [authMiddleware.tokenVerify, authMiddleware.isAdmin], announcementController.deleteAnnouncement);

module.exports = router;
