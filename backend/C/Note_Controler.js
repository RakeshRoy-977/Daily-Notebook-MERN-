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

const updateNote = async (req, res) => {
  try {
    const { title, discription, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (discription) {
      newNote.discription = discription;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let NoteId = await NoteSchema.findById(req.params.id);
    if (!NoteId) {
      return res.status(404).json({ message: "Not Found" });
    }
    if (NoteId.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Allowed" });
    }
    NoteId = await NoteSchema.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    console.log(req.user.id);
    res.json({ NoteId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    let NoteId = await NoteSchema.findById(req.params.id);
    if (!NoteId) {
      return res.status(404).json({ message: "Not Found" });
    }
    if (NoteId.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note Allowed" });
    }
    NoteId = await NoteSchema.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchNotes, addnote, updateNote, deleteNote };
