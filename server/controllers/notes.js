import Note from "../models/note.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();

        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createNote = async (req, res) => {
    const note = req.body;

    const newNote = new Note(note);
    try {
        await newNote.save();

        res.status(201).json(newNote);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
