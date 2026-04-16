const express = require("express");
const {
  approveTitle,
  rejectTitle,
  deleteTitle,
} = require("../controllers/adminTitleController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

// ✅ APPROVE specific title
router.patch(
  "/:id/:field/approve",
  [authMiddleware.tokenVerify, authMiddleware.isAdmin],
  approveTitle
);

// ✅ REJECT specific title
router.patch(
  "/:id/:field/reject",
  [authMiddleware.tokenVerify, authMiddleware.isAdmin],
  rejectTitle
);

// ✅ DELETE whole document
router.delete(
  "/:id",
  [authMiddleware.tokenVerify, authMiddleware.isAdmin],
  deleteTitle
);

module.exports = router;