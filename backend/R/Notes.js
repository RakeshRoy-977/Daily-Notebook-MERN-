const express = require("express");
const fetchUser = require("../Middleware/fetchUser");
const { fetchNotes, addnote } = require("../C/Note_Controler");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/fetch", fetchUser, fetchNotes);

router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 2 }),
    body("discription", "Enter a valid discription").isLength({ min: 2 }),
  ],
  addnote
);

module.exports = router;
