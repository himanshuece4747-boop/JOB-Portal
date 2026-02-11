const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

// Upload user image (protected)
router.post(
    "/upload-image",
    protect,
    upload.single("image"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl,
        });
    }
);

module.exports = router;
