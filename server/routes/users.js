import bodyParser from "body-parser";
import express from "express";
import { login, signup } from "../controllers/users.js";

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/login', login);
router.post('/signup', signup);

export default router;