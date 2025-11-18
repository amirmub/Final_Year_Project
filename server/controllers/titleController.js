const Title = require("../models/titleModel");
const User = require("../models/userModel");

// Create a new title for a user
async function createTitle(req, res) {
  const { name, department, title_1, title_2, title_3 } = req.body;

  try {
    // Create title linked to user from nested route
    const title = await Title.create({
      name,
      department,
      title_1,
      title_2,
      title_3,
      user: req.params.userId
    });

    // Populate user info
    await title.populate({
      path: "user",
      select: "-password -__v -createdAt -passwordConfirm"
    });

    res.status(201).json({
      status: "success",
      data: title
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
}


// to get all Titles
async function getAllTitles(req, res) {
 try {
    const allTitles =  await Title.find({});
    return res.status(200).json({ 
       total : allTitles.length, status: "success", message : allTitles
    });
  } catch (error) {
    return res.status(500).json({ 
        error : error,
        message: "Internal server error"
    });
  }
};

// Get a single title with populated user info
async function getTitle(req, res) {
  try {
    const title = await Title.findById(req.params.id)
      .select("-__v -createdAt")
      .populate({
        path: "user",
        select: "-password -__v -createdAt"
      });

    if (!title) {
      return res.status(404).json({
        status: "fail",
        message: "Title not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: title
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
}

//  to delete a title
async function deleteTitle(req, res) {
   try {
    const title = await Title.findById(req.params.id);
    if (!title) {
        return res.status(404).json({ status : "fail", message: "title not found"});
    }

    await title.deleteOne();
    return res.status(200).json({ status : "success", message: "title deleted successfully", data: null });

   } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error"});
   }
};

module.exports = { createTitle, getAllTitles, getTitle, deleteTitle };