const Title = require("../models/titleModel");
const AdminTitleAction = require("../models/AdminTitleAction");

const validFields = ["title_1", "title_2", "title_3"];

// ✅ APPROVE individual title
exports.approveTitle = async (req, res) => {
  try {
    const { id, field } = req.params;
    const { note } = req.body || {}; // ✅ optional note

    if (!validFields.includes(field)) {
      return res.status(400).json({ message: "Invalid title field" });
    }

    const title = await Title.findById(id);

    if (!title) {
      return res.status(404).json({ message: "Title not found" });
    }

    const oldStatus = title[field].status;

    if (oldStatus === "approved") {
      return res.status(400).json({ message: "Already approved" });
    }

    // ✅ update status + note
    title[field].status = "approved";
    title[field].note = note || ""; // NEW
    await title.save();

    await AdminTitleAction.create({
      titleId: id,
      action: "approved",
      previousStatus: oldStatus,
      newStatus: "approved",
      note: note || field,
      adminId: req.user.id,
    });

    res.status(200).json({
      status: "success",
      data: title,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ REJECT individual title
exports.rejectTitle = async (req, res) => {
  try {
    const { id, field } = req.params;
    const { note } = req.body || {};

    if (!validFields.includes(field)) {
      return res.status(400).json({ message: "Invalid title field" });
    }

    const title = await Title.findById(id);

    if (!title) {
      return res.status(404).json({ message: "Title not found" });
    }

    const oldStatus = title[field].status;

    // ✅ update status + note
    title[field].status = "rejected";
    title[field].note = note || "";
    await title.save();

    await AdminTitleAction.create({
      titleId: id,
      action: "rejected",
      previousStatus: oldStatus,
      newStatus: "rejected",
      note: note || field,
      adminId: req.user.id,
    });

    res.status(200).json({
      status: "success",
      data: title,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE whole title
exports.deleteTitle = async (req, res) => {
  try {
    const { id } = req.params;

    const title = await Title.findById(id);

    if (!title) {
      return res.status(404).json({
        status: "fail",
        message: "Title not found",
      });
    }

    await title.deleteOne();

    await AdminTitleAction.create({
      titleId: id,
      action: "deleted",
      adminId: req.user.id,
    });

    res.status(200).json({
      status: "success",
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};