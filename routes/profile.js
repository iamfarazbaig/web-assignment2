const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Profile = require("../models/Profile");
const auth = require("../middleware/auth");
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res
        .status(400)
        .json({ msg: `No profile exists for user ${req.user.name}` });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      bio,
      status,
      skills,
      linkedin,
      github
    } = req.body;
    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim()); //turning comma separated values to array
    }

    //Build social object
    profileFields.social = {};
    if (linkedin) profileFields.linkedin = linkedin;
    if (github) profileFields.github = github;

    try {
      let profile = await Profile.findOne({ user: req.user.id }); //find profile by user which comes from token id. use await in front of every mongoose method
      if (profile) {
        //Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { returnNewDocument: true } //new
        );
        return res.json(profile);
      }
      //if profile not found,create it
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
    console.log(profileFields.skills);
  }
);

module.exports = router;
