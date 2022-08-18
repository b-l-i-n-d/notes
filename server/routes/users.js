import express from 'express';
import { login, signup } from '../controllers/users.js';
import { userValidationRules, validate } from '../middleware/validator.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', userValidationRules(), validate, signup);

export default router;
