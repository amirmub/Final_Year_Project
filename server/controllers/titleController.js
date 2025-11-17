const Title = require("../models/titleModel");
const mongoose = require("mongoose");

// Create User Controller
async function createTitle(req, res) {
  const { name, department, title_1, title_2, title_3 } = req.body;

  try {
    // Create Title
    const title = await Title.create({
      name,
      department,
      title_1,
      title_2,
      title_3
    });

    res.status(201).json({
      status: "success",
      data: { title }
    });

  } catch (error) {
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

// to get a single Title
async function getTitle(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "Invalid ID format" });
    }

    const title = await Title.findById(id);

    if (!title) {
      return res.status(404).json({ status: "fail", message: "Title not found" });
    }

    res.status(200).json({ status: "success", message: title });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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