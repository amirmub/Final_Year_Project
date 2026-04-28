const mongoose = require("mongoose");
const Title = require("../models/titleModel");
const User = require("../models/userModel");
const { extractTextFromPDF } = require("../services/pdfService");
// const { checkSimilarity } = require("../services/similarityService");
const { checkSimilarity, generateProfessionalSummary } = require("../services/similarityService");

async function createTitle(req, res) {
  const { name, department, title_1, title_2, title_3, group_member } =
    req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF required" });
    }

    const pdfText = await extractTextFromPDF(req.file.buffer);

    if (!pdfText || pdfText.length < 200) {
      return res.status(400).json({ message: "Invalid PDF" });
    }

    // ✅ CALL API ONCE
    const apiResults = await checkSimilarity(pdfText, title_1, name);

    // ensure 3
    while (apiResults.length < 3) {
      apiResults.push({});
    }

    // ✅ MAP EACH RESULT
    const mapTitle = (t, api) => ({
      text: t,
      similarity_percent: api.similarity || 0,
      ai_report: generateProfessionalSummary(api, t, name, "2026"),
    });

    const title = await Title.create({
      name,
      department,
      group_member,

      title_1: mapTitle(title_1, apiResults[0]),
      title_2: mapTitle(title_2, apiResults[1]),
      title_3: mapTitle(title_3, apiResults[2]),

      user: req.params.userId,
    });

    res.status(201).json({
      status: "success",
      data: title,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}


//  GET ALL
async function getAllTitles(req, res) {
  try {
    const allTitles = await Title.find({});
    return res
      .status(200)
      .json({ total: allTitles.length, status: "success", message: allTitles });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Internal server error" });
  }
}

//  GET ONE
async function getTitle(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid ID",
      });
    }

    const t = await Title.findById(req.params.id).select("-__v").populate({
      path: "user",
      select: "-password -__v",
    });

    if (!t) {
      return res.status(404).json({
        status: "fail",
        message: "Title not found",
      });
    }

    const formatted = {
      ...t.toObject(),
      title_1: t.title_1 || { text: null, status: "pending" },
      title_2: t.title_2 || { text: null, status: "pending" },
      title_3: t.title_3 || { text: null, status: "pending" },
    };

    res.status(200).json({
      status: "success",
      data: formatted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
}

//  UPDATE (FIXED FOR NEW STRUCTURE)
async function updateTitle(req, res) {
  try {
    const title = await Title.findById(req.params.id);

    if (!title) {
      return res.status(404).json({
        status: "fail",
        message: "Title not found",
      });
    }

    const updates = Object.keys(req.body);

    updates.forEach((field) => {
      //  ONLY handle title fields safely
      if (["title_1", "title_2", "title_3"].includes(field)) {
        // ensure object exists
        if (!title[field]) {
          title[field] = { text: "", status: "pending", note: "" };
        }

        //  update ONLY text (not override whole object)
        if (req.body[field].text !== undefined) {
          title[field].text = req.body[field].text;
        }

        // optional updates
        if (req.body[field].status) {
          title[field].status = req.body[field].status;
        }

        if (req.body[field].note) {
          title[field].note = req.body[field].note;
        }
      } else {
        // normal fields
        title[field] = req.body[field];
      }
    });

    await title.save();

    return res.status(200).json({
      status: "success",
      message: "Title updated successfully",
      data: title,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error); // 👈 VERY IMPORTANT
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

//  DELETE
async function deleteTitle(req, res) {
  try {
    const title = await Title.findById(req.params.id);

    if (!title) {
      return res.status(404).json({
        status: "fail",
        message: "Title not found",
      });
    }

    await title.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  createTitle,
  getAllTitles,
  getTitle,
  updateTitle,
  deleteTitle,
};
