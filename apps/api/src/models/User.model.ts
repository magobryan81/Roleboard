import { Schema, model, Document } from 'mongoose';
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false }

}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await hashValue(this.password);
});

userSchema.methods.comparePassword = async function (val:string) {
    return compareValue(val, this.password);
}

const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;