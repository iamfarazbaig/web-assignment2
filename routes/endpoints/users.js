const express = require("express");
const router = express.Router();

const { check } = require("express-validator/check");
const usersController = require("../../controllers/users");

router.post(
  "/",
  [
    check("name", "Please fill out your Name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6, max: 15 })
  ],
  usersController.user
);

module.exports = router;
