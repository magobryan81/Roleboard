import { INTERNAL_SERVER_ERROR, NOT_FOUND, CONFLICT } from "../constants/http";
import UserModel from "../models/User.model";
import VerificationCodeModel from "../models/verificationCode.model";
import VerificationCode from "../constants/verificationCode";
import appAssert from "../utils/appAssert";
import { Types } from "mongoose";
import { oneYearFromNow } from "../utils/date";
import { APP_ORIGIN } from "../constants/env";
import { sendMail } from "../utils/sendMail";
import { getVerifyEmailTemplate } from "../utils/emailTemplate";
import SessionModel from "../models/session.model";

type UpdateNameParams = {
    userId: Types.ObjectId;
    name: string;
}

export const updateName = async (
    { userId, name}: UpdateNameParams
) => {

    // update user's name
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
            name,
        },
        {
            new: true
        }
    )
    appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to update name");
    
    return {
        user: updatedUser.omitPassword(),
    }
}

type RequestEmailChangeParams = {
    userId: Types.ObjectId;
    newEmail: string;
}

export const requestEmailChange = async (
    { userId, newEmail}: RequestEmailChangeParams
) => {
    // check if email is already taken
    const existingEmail = await UserModel.exists({
        email: newEmail
    });
    appAssert(!existingEmail, CONFLICT, "Email already in use");

    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId,
        type: VerificationCode.EmailVerification,
        newEmail,
        expiresAt: oneYearFromNow(),
    });

    // send verification email
    const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;
    const { error } = await sendMail({
        to: newEmail,
        ...getVerifyEmailTemplate(url),
    });

    if (error) {
        console.log(error);
    }

    // return
    return {
        message: "Verification email sent",
    }
}

export const verifyEmail = async(code: string) => {
    // get verification code
    const validCode = await VerificationCodeModel.findOne({
        _id: code,
        type: VerificationCode.EmailVerification,
        expiresAt: { $gt: new Date() },
    });
    appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

    // update email to verified true
    // update user's email
    const updatedUser = await UserModel.findByIdAndUpdate(
        validCode.userId,
        {
            email: validCode.newEmail,
        },
        {
            new: true,
        }
    )
    appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to update email");
    // delete verification code
    await validCode.deleteOne();
    
    // delete session
    await SessionModel.deleteMany({
        userId: updatedUser._id,
    });

    return {
        user: updatedUser.omitPassword(),
    }
}
