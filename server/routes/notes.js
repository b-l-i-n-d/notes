import bodyParser from "body-parser";
import express from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/notes.js";

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/", getNotes);
router.post("/", jsonParser, createNote);
router.patch("/:id", jsonParser, updateNote);
router.delete("/:id", deleteNote);

export default router;
