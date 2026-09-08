const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getDashboardStats);

module.exports = router;