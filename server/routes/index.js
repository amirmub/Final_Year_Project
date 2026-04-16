const express = require("express");
const router = express.Router();

const userRouter = require('./userRoute');
router.use(userRouter);

const userLogin = require('./userLoginRoute');
router.use(userLogin);

const titleRoutes = require('./titleRoute'); // ✅ ADD THIS
router.use("/users/:userId/titles", titleRoutes); // ✅ ADD THIS

const announcement = require('./announcementRoute');
router.use(announcement);

const password = require('./passwordRoute');
router.use(password);

const adminTitleRoutes = require('./adminTitleRoutes');
router.use("/users/:userId/titles", adminTitleRoutes);

module.exports = router;