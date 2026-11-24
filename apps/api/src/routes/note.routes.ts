import express from "express";
import * as NoteController from "../controllers/note.controller";

const router = express.Router();

router.post("/create", NoteController.createNoteHandler);
router.get("/", NoteController.getNoteHandler);
router.patch("/:noteId", NoteController.updateNoteHandler);

export default router;