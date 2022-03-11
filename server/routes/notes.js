import bodyParser from "body-parser";
import express from "express";
import { createNote, getNotes, updateNote } from "../controllers/notes.js";

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/", getNotes);
router.post("/", jsonParser, createNote);
router.patch("/:id", jsonParser, updateNote);

export default router;
