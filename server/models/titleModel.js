const mongoose = require('mongoose');

const singleTitleSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  note: {
    type: String,
    default: "" // ✅ NEW FIELD
  }
}, { _id: false });

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ["Computer Science", "Information Science", "Information Technology", "Software Engineering"],
    required: true
  },
  group_member:{
    type: Number,
    max: 5,
    min: 1
  },

  title_1: singleTitleSchema,
  title_2: singleTitleSchema,
  title_3: singleTitleSchema,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

}, { timestamps: true });

const Title = mongoose.model('Title', titleSchema);

module.exports = Title;