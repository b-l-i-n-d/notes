import mongoose from 'mongoose';
import Note from '../models/note.js';
import User from '../models/user.js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().populate('created_by', 'name').sort({
            time_stamp: -1,
        });

        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getNotesByUser = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No user with that ID.');
        }
        const { notes, folders } = await User.findById(_id)
            .populate({
                path: 'notes',
                options: { sort: { time_stamp: -1 } },
                populate: {
                    path: 'created_by',
                    select: 'name',
                },
            })
            .select('notes folders');

        return res.status(200).json({ notes, folders });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const createNote = async (req, res) => {
    const note = {
        ...req.body,
        created_by: req.userId,
        time_stamp: new Date(),
    };

    const newNote = new Note(note);
    try {
        const createdNote = await newNote.save();
        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $push: {
                    notes: createdNote._id,
                },
            }
        );

        res.status(201).json(newNote);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    const { id: _id } = req.params;
    const note = { ...req.body, time_stamp: new Date() };

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that ID.');
    }

    const updatedNote = await Note.findByIdAndUpdate(_id, { ...note, _id }, { new: true });

    return res.status(200).json(updatedNote);
};

export const deleteNote = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post it that ID.');
    }

    try {
        await Note.findByIdAndDelete(_id);

        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $pull: {
                    notes: _id,
                },
            }
        );
        return res.status(200).json({ message: 'Notes Deleted' });
    } catch (error) {
        return res.status(410).json({ message: error.message });
    }
};
