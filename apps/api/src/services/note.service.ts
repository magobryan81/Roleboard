import { NoteModel } from "../models/note.model";
import { Types } from "mongoose";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http";
import appAssert from "../utils/appAssert";

type CreateNoteParams = {
    title: string;
    content?: string | undefined;
};

export const createNote = async(
    userId: Types.ObjectId,
    data: CreateNoteParams
) => {
    // create note application
    const note = await NoteModel.create({
        ...data,
        userId,
    });
    
    // return
    return { note };
}

export const updateNote = async(
    userId: Types.ObjectId,
    noteId: string,
    data: Partial<CreateNoteParams>,
) => {
    const note = await NoteModel.findOneAndUpdate(
        { _id: noteId, userId},
        { $set: data},
        {
            new: true,
            runValidators: true,
        }
    );
    appAssert(note, NOT_FOUND, "Note not found");
    return { note }
}