const Title = require("../models/titleModel");
const User = require("../models/userModel");
const { extractTextFromPDF } = require("../services/pdfService");
const { checkSimilarity } = require("../services/similarityService");
async function createTitle(req, res) {
  const { name, department, title_1, title_2, title_3, group_member } =
    req.body;

  try {
    let pdfText = "";

    // ✅ 1. CHECK FILE
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    // // console.log("📂 FILE:", req.file);

    // ✅ 2. EXTRACT PDF TEXT
    pdfText = await extractTextFromPDF(req.file.buffer);

    // // console.log("📄 PDF LENGTH:", pdfText.length);

    // ❌ IF PDF TOO SHORT → STOP
    if (!pdfText || pdfText.length < 200) {
      return res.status(400).json({
        message: "PDF content too short. Please upload valid document.",
      });
    }

    // ✅ 3. SEND ONLY PDF TEXT TO AI (IMPORTANT)
    const aiResult = await checkSimilarity(pdfText);

    console.log("🤖 AI RESULT:", aiResult);

    // ✅ 4. HANDLE AI RESPONSE
    const similarity = aiResult?.similarity_percent || 0;

    let report = aiResult?.gemini_report || "";

    // ✅ HANDLE GEMINI ERROR (QUOTA / FAIL)
    if (!report || report.includes("Gemini error")) {
      report = "AI report not available (quota limit).";
    }

    // ✅ 5. SAVE TO DATABASE
    const title = await Title.create({
      name,
      department,
      group_member,

      title_1: {
        text: title_1,
        similarity_percent: similarity,
        ai_report: report,
      },

      title_2: {
        text: title_2,
        similarity_percent: similarity,
        ai_report: report,
      },

      title_3: {
        text: title_3,
        similarity_percent: similarity,
        ai_report: report,
      },

      user: req.params.userId,
    });

    // ✅ 6. RESPONSE
    res.status(201).json({
      status: "success",
      data: title,
    });

  } catch (error) {
    console.error("❌ CREATE TITLE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
}

// ✅ GET ALL
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

// ✅ GET ONE
async function getTitle(req, res) {
  try {
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

    // ✅ normalize response
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
  }
}

// ✅ UPDATE (FIXED FOR NEW STRUCTURE)
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
      // ✅ ONLY handle title fields safely
      if (["title_1", "title_2", "title_3"].includes(field)) {
        // ensure object exists
        if (!title[field]) {
          title[field] = { text: "", status: "pending", note: "" };
        }

        // ✅ update ONLY text (not override whole object)
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

// ✅ DELETE
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
