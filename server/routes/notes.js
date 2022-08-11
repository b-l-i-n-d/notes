import bodyParser from 'body-parser';
import express from 'express';
import {
    createNote,
    deleteNote,
    getNotes,
    getNotesByUser,
    updateNote,
} from '../controllers/notes.js';

import auth from '../middleware/auth.js';
import checkOwnerShip from '../middleware/checkOwnerShip.js';

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', auth, getNotes);
router.get('/:id', auth, checkOwnerShip, getNotesByUser);
router.post('/', jsonParser, auth, createNote);
router.patch('/:id', jsonParser, auth, updateNote);
router.delete('/:id', auth, deleteNote);

export default router;
