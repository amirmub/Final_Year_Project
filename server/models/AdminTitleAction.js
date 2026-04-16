const mongoose = require("mongoose");

const adminTitleActionSchema = new mongoose.Schema(
  {
    titleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Title",
      required: true,
    },

    action: {
      type: String,
      enum: ["approved", "rejected", "deleted"],
      required: true,
    },

    previousStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },

    newStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    note: {
      type: String, // can store field name (title_1, etc)
    },
  },
  { timestamps: true }
);

const AdminTitleAction = mongoose.model(
  "AdminTitleAction",
  adminTitleActionSchema
);

module.exports = AdminTitleAction;