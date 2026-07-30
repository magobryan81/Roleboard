import { APP_ORIGIN } from "../constants/env";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED, UNPROCESSABLE_CONTENT } from '../constants/http';
import VerificationCode from "../constants/verificationCode";
import SessionModel from "../models/session.model";
import UserModel, { UserDocument } from "../models/User.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { hashValue } from "../utils/bcrypt";
import { ONE_DAY_MS, fiveMinutesAgo, oneHourFromNow, oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import jwt from "jsonwebtoken";

type CreateAccountParams = {
    name: string;
    email: string;
    password: string;
    userAgent?: string | undefined;
};

export const createAccount = async (data: CreateAccountParams) => {
    // verify email is not taken
    const existingUser = await UserModel.exists({
        email: data.email,
    });
    if (existingUser) {
        throw new Error("User already exists!");
    }
    // create user
    const user = await UserModel.create({
        name: data.name,
        email: data.email,
        password: data.password,
    })
    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCode.EmailVerification,
        expiresAt: oneYearFromNow()
    })

    // send verification email

    // create session
    const session = await SessionModel.create({
        userId: user._id,
        ...(data.userAgent && { userAgent: data.userAgent }),
    });

    // sign access token & refresh token
    const refreshToken = jwt.sign(
        { sessionId: session._id },
        JWT_REFRESH_SECRET,
        {
            audience: ["user"],
            expiresIn: "30d",
        }
    );

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id,
        },
        JWT_SECRET,
        {
            audience: ["user"],
            expiresIn: "30d",
        }
    )

    // return user & tokens
    return {
        user,
        accessToken,
        refreshToken,
    }
}
