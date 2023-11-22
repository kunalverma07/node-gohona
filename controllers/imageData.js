const ImageData = require("../models/imageData");
const { uploadFileToFirebase } = require("../functions/uploadFile");
const path = require("path");

// Controller for uploading images
exports.uploadImages = async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const filename =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      const imageUrl = await uploadFileToFirebase(file, filename);
      imageUrls.push(imageUrl);
    }

    // Create a new entry in the database with the image URLs
    const imageData = new ImageData({
      name: req.body.name,
      images: imageUrls,
    });

    const savedImageData = await imageData.save();

    res.status(201).json(savedImageData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUploadImages = async (req, res) => {
  try {
    const imageData = await ImageData.find();
    res.status(201).json({
      message: "successfully fetched all image data",
      data: imageData,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
