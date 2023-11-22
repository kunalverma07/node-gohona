const Banner = require("../models/banner");
const path = require("path");
const { uploadFileToFirebase } = require("../functions/uploadFile");

exports.createBanner = async (req, res) => {
  try {
    const title = req.body.title;
    const existingBanner = await Banner.findOne({ title });

    const filename =
      req.file.fieldname +
      "-" +
      Date.now() +
      path.extname(req.file.originalname);
    const imageUrl = await uploadFileToFirebase(req.file, filename);

    if (existingBanner) {
      existingBanner.image = imageUrl;

      await existingBanner.save();

      return res.status(200).json({
        success: true,
        message: `Banner with title '${title}' updated successfully.`,
        data: existingBanner,
      });
    } else {
      const newBanner = await Banner.create({
        title: title,
        image: imageUrl,
      });

      return res.status(201).json({
        success: true,
        message: "Banner created successfully",
        data: newBanner,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create or update a banner",
      error: err.message,
    });
  }
};

// Get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      success: true,
      message: "Banners retrieved successfully",
      data: banners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve banners",
      error: err.message,
    });
  }
};

// Update a banner by title

exports.updateBanner = async (req, res) => {
  try {
    const title = req.body.title;
    const existingBanner = await Banner.findOne({ title });

    if (!existingBanner) {
      return res.status(404).json({
        success: false,
        message: `Banner with title '${title}' not found.`,
      });
    }

    // Update the image with the new file if provided
    if (req.file) {
      const uniqueFilename = `${title}-${Date.now()}${path.extname(
        req.file.originalname
      )}`;

      existingBanner.image = uniqueFilename;
    }

    await existingBanner.save();

    return res.status(200).json({
      success: true,
      message: `Banner with title '${title}' updated successfully.`,
      data: existingBanner,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update the banner",
      error: err.message,
    });
  }
};

// Delete a banner by ID
exports.deleteBanner = async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndRemove(req.params.id);
    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
      data: deletedBanner,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete the banner",
      error: err.message,
    });
  }
};
