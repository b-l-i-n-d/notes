import express from 'express';
import { addFolder, deleteFolder, login, signup, updateFolder } from '../controllers/users.js';
import auth from '../middleware/auth.js';
import { userValidationRules, validate } from '../middleware/validator.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', userValidationRules(), validate, signup);
router.patch('/folders', auth, addFolder);
router.patch('/folders/:id', auth, updateFolder);
router.patch('/folders/:id/delete', auth, deleteFolder);

export default router;
