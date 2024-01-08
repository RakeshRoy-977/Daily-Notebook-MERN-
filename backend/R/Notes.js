const express = require("express");
const fetchUser = require("../Middleware/fetchUser");
const {
  fetchNotes,
  addnote,
  updateNote,
  deleteNote,
} = require("../C/Note_Controler");
const { body, validationResult } = require("express-validator");

const router = express.Router();

//get all data
router.get("/fetch", fetchUser, fetchNotes);

//add data
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 2 }),
    body("discription", "Enter a valid discription").isLength({ min: 2 }),
  ],
  addnote
);

router.put("/updatenote/:id", fetchUser, updateNote);

router.delete("/delete/:id", fetchUser, deleteNote);

module.exports = router;
