const Announcement = require("../models/announcementModel");

// Create Announcement Controller
async function createAnnouncement(req, res) {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      status: "fail",
      message: "Enter all require field"
    });
  }

  try {
    // Create Announcement
    const announcement = await Announcement.create({ title, description });

    res.status(201).json({
      status: "success",
      data: { announcement }
    });

  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
}

// to get all announcement
async function getAllAnnouncement(req, res) {
 try {
    const allAnnouncement =  await Announcement.find({});
    return res.status(200).json({ 
       total : allAnnouncement.length, status: "success", message : allAnnouncement
    });
  } catch (error) {
    console.log("get all error:",error.message);
    return res.status(500).json({ 
        error : error,
        message: "Internal server error" 
    });
  }
};

// to get a single announcement
async function getAnnouncement(req, res) {
  try { 
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ status: "fail", message: "Invalid ID" });
    }

    res.status(200).json({ status: "success", message: announcement });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Internal server error" });
  }
}

//  to update a announcement
async function updateAnnouncement (req, res) {
    try {
    const { title, description } = req.body;

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ status : "fail", message: "Announcement not found" });
    }

    announcement.title = title || announcement.title;
    announcement.description = description || announcement.description;

    await announcement.save();
    return res.status(200).json({ status : "success", message: "Announcement updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error"});
  }
};

//  to delete a announcement
async function deleteAnnouncement(req, res) {
   try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
        return res.status(404).json({ status : "fail", message: "Announcement not found"});
    }

    await announcement.deleteOne();
    return res.status(200).json({ status : "success", message: "Announcement deleted successfully", data: null });

   } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error"});
   }
};

module.exports = { createAnnouncement, getAllAnnouncement, getAnnouncement, updateAnnouncement, deleteAnnouncement };
