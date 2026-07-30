import { Document, Schema, model, Types } from "mongoose";
import VerificationCode from "../constants/verificationCode";

export interface VerificationCodeDocument extends Document {
    userId: Types.ObjectId;
    type: VerificationCode;
    expiresAt: Date;
    createdAt: Date;
}

const verificationCodeSchema = new Schema<VerificationCodeDocument>({
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now},
    expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = model<VerificationCodeDocument>(
    "VerificationCode",
    verificationCodeSchema,
    "verification_codes",
);

export default VerificationCodeModel;