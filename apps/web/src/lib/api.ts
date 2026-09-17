import API from "../config/apiClient";
import type { LoginInput } from "../features/auth/types/loginSchema";
import type { RegisterInput } from "../features/auth/types/registerSchema";

export const login = async (data: LoginInput) => API.post("auth/login", data);
export const register = async (data: RegisterInput) => API.post("auth/register", data);
export const verifyEmail = async (verificationCode: string) => API.get(`auth/email/verify/${verificationCode}`);