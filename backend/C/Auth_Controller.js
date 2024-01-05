require("dotenv").config();
const { validationResult } = require("express-validator");
const user = require("../M/Users_Model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check for existing user by email
    let existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //Hashing
    const salt = await bcrypt.genSalt(10);
    const secPas = await bcrypt.hash(req.body.password, salt);
    // If user doesn't exist, create a new user
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: secPas,
    });

    //jwt
    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, process.env.JWT);

    // Send success response with the new user auth token
    res.json({ authToken });
  } catch (error) {
    console.error(error);
    // Handle any potential error during user creation or database operations
    res.status(500).json({ error: "Backend Problem" });
  }
};

const authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body; // Destructure email and password from req.body

  try {
    let oldUser = await user.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({ error: "Please check your Email ID" });
    }

    const passwordCompare = await bcrypt.compare(password, oldUser.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please check your password" });
    }

    //jwt
    const data = { user: { id: oldUser.id } }; // Use oldUser.id to get the user's ID
    const authToken = jwt.sign(data, process.env.JWT);
    res.json({ authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Backend Problem" });
  }
};

const getuser = async (req, res) => {
  try {
    userId = req.user.id;
    const User = await user.findById(userId).select("-password");
    res.send(User);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Backend Problemss" });
  }
};

module.exports = { createUser, authUser, getuser };
