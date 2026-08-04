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
import appAssert from "../utils/appAssert";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";

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
    appAssert(!existingUser, CONFLICT, "Email already in use");
    // create user
    const user = await UserModel.create({
        name: data.name,
        email: data.email,
        password: data.password,
    })
    const userId = user._id;
    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId,
        type: VerificationCode.EmailVerification,
        expiresAt: oneYearFromNow()
    })

    // send verification email

    // create session
    const session = await SessionModel.create({
        userId,
        ...(data.userAgent && { userAgent: data.userAgent }),
    });

    // sign access token & refresh token
    const refreshToken = signToken(
        { sessionId: session._id },
        refreshTokenSignOptions
    );

    const accessToken = signToken(
        {
            userId,
            sessionId: session._id,
        },
    )

    // return user & tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken,
    }
}

type LoginParams = {
    email: string;
    password: string;
    userAgent?: string | undefined;
};

export const loginUser = async ({email, password, userAgent}:LoginParams ) => {
    // get the user by email
    const user = await UserModel.findOne({email});
    appAssert(user, UNAUTHORIZED, "Invalid email or password");

    // validate password from the request
    const isValid = await user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, "Invalid username or password");

    const userId = user._id;

    // create a session
    const session = await SessionModel.create({
        userId,
        ...(userAgent && { userAgent: userAgent }),
    });

    const sessionInfo = {
        sessionId: session._id,
    }

    // sign access token & refresh token
    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);


    const accessToken = signToken(
        {
            ...sessionInfo,
            userId: user._id,
        },

    )

    // return user & tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken,
    }

}
