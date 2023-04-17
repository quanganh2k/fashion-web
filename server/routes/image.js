const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const Image = require("../models/Image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  // kiểm tra định dạng file, nếu là 1 trong 2 định dạng này thì sẽ lưu
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // tối đa là 5mb
  },
  fileFilter: fileFilter,
});

router.post(
  "/upload",
  auth,
  authAdmin,
  upload.array("image"),
  async (req, res) => {
    try {
     
      if (!req.files) {
        return res
          .status(400)
          .json({ success: false, message: "Please upload image" });
      } else {
        const files = req.files
        console.log("__REQ", req.files)
        let arrImages = []
        for(const file of files) {
          const image = file.path.replace(/\\/g, "/")
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "fashionShop",
          });
          arrImages.push({name: file.originalname, url: uploadResponse})
        }
        // const image = req.file.path.replace(/\\/g, "/");

        // const uploadResponse = await cloudinary.uploader.upload(image, {
        //   folder: "fashionShop",
        // });

        console.log("___arrIMG", arrImages)

        if (Array.isArray(arrImages) && arrImages.length > 0) {
          console.log("trueee")
          const newImage = new Image({
            image: arrImages,
          });

          console.log("__NWE", newImage)
          await newImage.save();
          res.json({
            success: true,
            message: "Create successfully",
            images: newImage,
          });
        }
        else {
          return res.status(400).json({
            success: false,
            message: "You need to upload image",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;