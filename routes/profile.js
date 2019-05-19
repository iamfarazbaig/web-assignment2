const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");

const profileController = require("../controllers/profile");
const auth = require("../middleware/auth");
//get current user profile
router.get("/me", auth, profileController.currentUser);

//create or update a user profile
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
  profileController.createUpdateUser
);
//get all profiles,public access
router.get("/", profileController.getAllProfiles);

//get profile by user id,public access
router.get("/user/:user_id", profileController.getUserById);

//delete profile, user and posts,private access
router.delete("/", auth, profileController.deleteProfile);

//adding experience
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty()
    ]
  ],
  profileController.addExperience
);

//delete experience from profile
router.delete("/experience/:exp_id", auth, profileController.deleteExperience);

//adding education
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of Study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  profileController.addEducation
);

//delete education from profile
router.delete("/education/:edu_id", auth, profileController.deleteEducation);

//get user repo from github
router.get("/github/:username", profileController.getGithub);

module.exports = router;
