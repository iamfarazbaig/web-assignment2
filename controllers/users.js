const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/User");

exports.user = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //if any of the validation above fails
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] }); //we match the same error body we get from the post request above
    }
    const avatar = gravatar.url(email, {
      s: "200", //size
      r: "pg", //rating
      d: "mm" //default=mm
    });
    //Create instance of user
    user = new User({
      name,
      email,
      avatar,
      password
    });
    //password encryption
    const salt = await bcrypt.genSalt(10); //we get a promise from bcrypt to use await and use 10 rounds
    user.password = await bcrypt.hash(password, salt);

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
    //User saved
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
};
