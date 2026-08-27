import { NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/User.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { updateNameSchema, updateEmailSchema } from "./user.schema";
import { requestEmailChange, updateName, verifyEmail } from "../services/user.service";
import { verificationCodeSchema } from "./auth.schema";

export const getUserHandler = catchErrors(async (req, res) => {
    const user = await UserModel.findById(req.userId);
    appAssert(user, NOT_FOUND, "User not found");
    return res.status(OK).json(user.omitPassword());
});

export const updateNameHandler = catchErrors(async (req, res) => {
    const { name } = updateNameSchema.parse(req.body);

    await updateName(
        {
            userId: req.userId, 
            name,
        }
    );
    
    return res.status(OK).json({
        message: "Name update successful",
    })
});

export const updateEmailHandler = catchErrors(async (req, res) => {
    const { newEmail } = updateEmailSchema.parse(req.body);

    await requestEmailChange(
        {
            userId: req.userId,
            newEmail,
        }
    );

    return res.status(OK).json({
        message: "Verification email sent",
    })
})

export const verifyEmailHandler = catchErrors(async (req, res) => {
    const verificationCode = verificationCodeSchema.parse(req.params.code);

    await verifyEmail(verificationCode);

    return res.status(OK).json({
        message: "Email was successful verified",
    })
})