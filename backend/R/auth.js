const express = require("express");

const { body, validationResult } = require("express-validator");
const { createUser, authUser, getuser } = require("../C/Auth_Controller");
const fetchUser = require("../Middleware/fetchUser");
const router = express.Router();
//

router.post(
  "/create",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 6 }),
  ],
  createUser
);

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  authUser
);

router.post("/getuser", fetchUser, getuser);

module.exports = router;
