const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
    saveJob,
    unsaveJob,
    getSavedJobs,
} = require("../controllers/savedJobController");

// Protected routes
router.post("/save/:jobId", protect, saveJob);
router.delete("/unsave/:jobId", protect, unsaveJob);
router.get("/", protect, getSavedJobs);

module.exports = router;