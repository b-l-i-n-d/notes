import mongoose from "mongoose";
import Note from "../models/note.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({
            time_stamp: -1,
        });
        
        res.status(200).json(notes);
        console.log("Notes Fetched");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createNote = async (req, res) => {
    const note = { ...req.body, time_stamp: new Date() };

    const newNote = new Note(note);
    try {
        await newNote.save();

        res.status(201).json(newNote);
        console.log("Note Created");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    const { id: _id } = req.params;
    const note = { ...req.body, time_stamp: new Date() };

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post it that ID.");
    }

    const updatedNote = await Note.findByIdAndUpdate(
        _id,
        { ...note, _id },
        { new: true },
    );
    
    res.status(200).json(updatedNote);
    console.log("Note Updated");
};

export const deleteNote = async (req, res) => {
    const {id: _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post it that ID.");
    } 

    await Note.findByIdAndDelete(_id);

    res.json({message: 'Notes Deleted'});
    console.log("Note Deleted");
}
