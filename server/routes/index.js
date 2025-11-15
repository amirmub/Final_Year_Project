const express = require("express");
const router = express.Router();

const userRouter = require('./userRoute');
router.use(userRouter);

const userLogin = require('./userLoginRoute');
router.use(userLogin);

module.exports = router;