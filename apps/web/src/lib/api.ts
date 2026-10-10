import API from "../config/apiClient";
import type { LoginInput, RegisterInput, ForgotPasswordInput } from "@/features/auth";

export const login = async (data: LoginInput) => API.post("auth/login", data);
export const register = async (data: RegisterInput) => API.post("auth/register", data);
export const verifyEmail = async (verificationCode: string) => API.get(`auth/email/verify/${verificationCode}`);
export const sendPasswordResetEmail = async (email: ForgotPasswordInput) => API.post("/auth/password/forgot", email);
type ResetPasswordParams = {
    verificationCode: string | null,
    password: string
}
export const resetPassword = async ({verificationCode, password}: ResetPasswordParams) => API.post("/auth/password/reset", {verificationCode, password});
type User = {
    _id: string;
    email: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}
export const getUser = async () => API.get<User, User>("/user");