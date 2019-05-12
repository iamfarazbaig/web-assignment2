const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");
const User = require("../models/User");
const auth = require("../middleware/auth");
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      res
        .status(400)
        .json({ msg: `No profile exists for user ${req.user.name}` });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
