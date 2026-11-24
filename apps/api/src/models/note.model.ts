import { Schema, model, Document, Types } from "mongoose";


export interface NoteDocument extends Document {
    userId: Types.ObjectId;
    jobId?: Types.ObjectId | null;
    title: string;
    content?: string;
    createdAt: Date;
    updatedAt: Date;
}

const noteSchema = new Schema<NoteDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: false,
        default: null,
        index: true,
    },
    title: {type: String, trim: true, default: "Untitled"},
    content: {type: String, default: ""},
}, {timestamps: true})

export const NoteModel = model<NoteDocument>("Note", noteSchema);