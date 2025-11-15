const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Create User Controller
async function createUser(req, res) {
  const { name, email, password, passwordConfirm } = req.body;

  try {
    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists. Please use another one."
      });
    }

    // 3. Check password confirm  
    if (password !== passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: "Password confirm does not match"
      });
    }

    // 4. Hash password  
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      passwordConfirm: hashedPassword
    });

    res.status(201).json({
      status: "success",
      data: { user }
    });

  } catch (error) {
    // If error occurs after upload, remove uploaded photo
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
}

module.exports = { createUser };