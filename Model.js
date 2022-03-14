const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  cloud_id: {
    type: String,
  },
  filepath: {
    type: String,
  },
});

module.exports = mongoose.model("blog", blogSchema);
