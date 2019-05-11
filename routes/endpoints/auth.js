const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");

const auth = require("../../middleware/auth");
const authController = require("../../controllers/auth");

router.get("/", auth, authController.getAuth);
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  authController.postAuth
);
module.exports = router;
