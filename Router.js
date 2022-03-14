const express = require("express");
const model = require("./Model");
const route = express.Router();
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfyxucfa8",
  api_key: "872166747173331",
  api_secret: "OdY5rt2ZUq_MozR3a6WMpJ0TEOY",
});

const keep = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: keep });

route.get("/", async (req, res) => {
  const newBlog = await model.find();
  try {
    res.status(200).json({
      mgs: "All news gotten",
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      mgs: "error",
      data: error,
    });
  }
});

route.post("/", upload.single("avatar"), async (req, res) => {
  const answer = await cloudinary.uploader.upload(req.file.path);
  console.log(answer);
  const newBlog = new model({
    date: req.body.date,
    category: req.body.category,
    header: req.body.header,
    story: req.body.story,
    avatar: answer.secure_url,
    cloud_id: answer.public_id,
    filepath: req.file.path,
  });

  const newUser = await newBlog.save();
  try {
    res.status(200).json({
      mgs: "A news added",
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      mgs: "error",
      data: error,
    });
  }
});

route.patch("/:id", upload.single("avatar"), async (req, res) => {
  const findID = await model.findById(req.params.id);
  if (findID) {
    await cloudinary.uploader.destroy(findID.cloud_id);
  }
  const answer = await cloudinary.uploader.upload(req.file.path);
  console.log(answer);
  const newBlog = await model.findByIdAndUpdate(
    {
      date: req.body.date,
      category: req.body.category,
      header: req.body.header,
      story: req.body.story,
      avatar: answer.secure_url,
      cloud_id: answer.public_id,
      filepath: req.file.path,
    },
    { new: true }
  );

  const newUser = await newBlog.save();
  try {
    res.status(200).json({
      mgs: "A news added",
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      mgs: "error",
      data: error,
    });
  }
});

route.get("/:id", async (req, res) => {
  const newBlog = await model.findById(req.params.id, req.body);
  try {
    res.status(200).json({
      mgs: "A news gotten",
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      mgs: "error",
      data: error,
    });
  }
});

route.delete("/:id", async (req, res) => {
  const findID = await model.findById(req.params.id);

  await cloudinary.uploader.destroy(findID.cloud_id);
  const newBlog = await model.findByIdAndRemove(req.params.id, req.body);
  res.send("news update deleted");
});
module.exports = route;
