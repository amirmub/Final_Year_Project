const Title = require("../models/titleModel");

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

module.exports = { createTitle, getAllTitles };