const express = require("express");
const { getUsers, toggleBlockUser, deleteUser } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getUsers);
router.patch("/:id/block", toggleBlockUser);
router.delete("/:id", deleteUser);

module.exports = router;