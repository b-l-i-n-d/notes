import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Note',
        },
    ],
    folders: {
        type: [
            {
                name: {
                    type: String,
                },
                notes: [
                    {
                        type: mongoose.Types.ObjectId,
                        ref: 'Note',
                    },
                ],
            },
        ],
        default: [
            { name: 'My Notes', notes: [] },
            { name: 'Todos', notes: [] },
            { name: 'Projects', notes: [] },
            { name: 'Journals', notes: [] },
            { name: 'Reading list', notes: [] },
        ],
    },
});

const User = mongoose.model('User', userSchema);

export default User;
