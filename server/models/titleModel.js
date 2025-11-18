const mongoose = require('mongoose');

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
  title_1: { type: String, required: true },
  title_2: { type: String, required: true },
  title_3: { type: String, required: true },

  // REQUIRED for populate()
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
