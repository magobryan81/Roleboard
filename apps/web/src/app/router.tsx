import { Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";
import VerifyEmail from "./routes/verifyEmail";
import ForgotPassword from "./routes/forgotPassword";
import ResetPassword from "./routes/resetPassword";
import { AppLayout } from "@/components/layouts/AppLayout";
import Home from "./routes/home";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<AppLayout />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email/verify/:code" element={<VerifyEmail />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset" element={<ResetPassword />} />
        </Routes>
    );
};