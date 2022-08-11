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
});

const User = mongoose.model('User', userSchema);

export default User;
