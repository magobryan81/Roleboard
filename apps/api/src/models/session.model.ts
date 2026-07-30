import { Document, Schema, model, Types } from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends Document {
    userId: Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiresAt: Date;
}

const sessionSchema = new Schema<SessionDocument>({
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId,
        index: true,
    },
    userAgent: { type: String },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: thirtyDaysFromNow,
    },
});

const SessionModel = model<SessionDocument>("Session", sessionSchema);
export default SessionModel;