const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Create User Controller
async function createUser(req, res) {
  const { name, email, password, passwordConfirm, role } = req.body;

  try {
    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists"
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
      passwordConfirm: hashedPassword,
      role
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

// to get all users
async function getAllUsers(req, res) {
 try {
    const allUser =  await User.find({});
    return res.status(200).json({ 
       total : allUser.length, status: "success", msg : allUser
    });
  } catch (error) {
    return res.status(500).json({ 
        error : error,
        msg: "Internal server error" 
    });
  }
};

// to get a single user
async function getUser(req, res) {
  try { 
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ status: "fail", message: "Invalid ID" });
    }

    res.status(200).json({ status: "success", msg: user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Internal server error" });
  }
}

//  to update a User
async function updateUser (req, res) {
    try {
    const { name, email, password, passwordConfirm, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ status : "fail", message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.passwordConfirm = passwordConfirm || user.passwordConfirm;
    user.role = role || user.role;

    await user.save();
    return res.status(200).json({ status : "success", message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error"});
  }
};

//  to delete a User
async function deleteUser(req, res) {
   try {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ status : "fail", message: "User not found"});
    }

    await User.deleteOne();
    return res.status(200).json({ status : "success", message: "User deleted successfully", data: null });

   } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error"});
   }
};


module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };