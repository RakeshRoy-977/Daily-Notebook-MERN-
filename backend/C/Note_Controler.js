const NoteSchema = require("../M/Note_Model");
const { body, validationResult } = require("express-validator");

const fetchNotes = async (req, res) => {
  try {
    const notes = await NoteSchema.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Backend Problem" });
  }
};

const addnote = async (req, res) => {
  try {
    const { title, discription, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new NoteSchema({
      title,
      discription,
      tag,
      user: req.user.id,
    });
    const saveNote = await note.save();
    res.send(saveNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Backend Problem" });
  }
};

module.exports = { fetchNotes, addnote };
