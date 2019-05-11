const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/User");

exports.getAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

exports.postAuth = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //if any of the validation above fails
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] }); //we match the same error body we get from the post request above
    }
    const isMatch = await bcrypt.compare(password, user.password); //compares entered password to the password from the user.password
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    //payload to pass with the token
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
};
