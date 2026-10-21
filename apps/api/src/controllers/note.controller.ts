import { CREATED, UNAUTHORIZED, OK, BAD_REQUEST, NOT_FOUND } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import { createNoteSchema, updateNoteSchema } from "./note.schema";
import { createNote, updateNote } from "../services/note.service";
import { NoteModel } from "../models/note.model";


export const getNoteHandler = catchErrors(async (req, res) => {
    const userId = req.userId;
    appAssert(userId, UNAUTHORIZED, "Not Authorized");

    const notes = await NoteModel.find({
        userId,
    })

    appAssert(notes, NOT_FOUND, "Notes not found");
    return res.status(OK).json({notes})
})

export const createNoteHandler = catchErrors(async (req, res) => {
    const userId = req.userId;

    appAssert(userId, UNAUTHORIZED, "Not Authorized");

    const request = createNoteSchema.parse({...req.body});

    const { note } = await createNote(userId, request);

    return res.status(CREATED).json({
        note,
        message: "Note successfully added",
    });
});

export const updateNoteHandler= catchErrors(async (req, res) => {
    const userId = req.userId;
    const noteId = req.params.noteId as string;

    appAssert(userId, UNAUTHORIZED, "Not Authorized");
    appAssert(noteId, BAD_REQUEST, "Note ID is required");

    const request = updateNoteSchema.parse(req.body);

    const { note } = await updateNote(userId, noteId, request);

    return res.status(OK).json({
        note,
        message: "Note updated successfully",
    });
});