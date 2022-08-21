import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({ result: existingUser, token });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            name,
            email,
            password: hashPassword,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        return res.status(200).json({ result, token });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const addFolder = async (req, res) => {
    const folder = req.body;

    try {
        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $push: {
                    folders: folder,
                },
            }
        );
        return res.status(200).json({
            message: 'Folder created',
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const updateFolder = async (req, res) => {
    const { name } = req.body;
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: 'No folder it that ID.' });
    }

    User.findOne(
        {
            _id: req.userId,
            folders: {
                $elemMatch: {
                    _id,
                },
            },
        },
        {
            'folders.$': 1,
        },
        (err, system) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            if (system === null) {
                return res.status(404).json({ message: 'No folder it that ID' });
            }
            return system;
        }
    );

    try {
        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $set: {
                    'folders.$[element].name': name,
                },
            },
            {
                arrayFilters: [{ 'element._id': mongoose.Types.ObjectId(_id) }],
            }
        );

        return res.status(200).json({
            message: 'Folder updated',
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const deleteFolder = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No folder it that ID.');
    }

    User.findOne(
        {
            _id: req.userId,
            folders: {
                $elemMatch: {
                    _id,
                },
            },
        },
        {
            'folders.$': 1,
        },
        (err, system) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            if (system === null) {
                return res.status(404).json({ message: 'No folder it that ID' });
            }
            return system;
        }
    );

    try {
        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $pull: {
                    folders: {
                        _id,
                    },
                },
            }
        );

        return res.status(200).json({
            message: 'Folder deleted',
        });
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};
