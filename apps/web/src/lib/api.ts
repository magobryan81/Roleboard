import API from "../config/apiClient";
import type { LoginInput } from "../features/auth/types/loginSchema";

export const login = async (data: LoginInput) => API.post("auth/login", data);