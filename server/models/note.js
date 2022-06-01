import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    modify_date: {
        type: String,
        required: true,
    },
    modify_time: {
        type: String,
        required: true,
    },
    tags: [
        {
            id: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true
            }
        }
    ],
    created_by: {
        type: String,
        required: true,
    },
    folder: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
    time_stamp: {
        type: Date,
        required: true,
    }
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
