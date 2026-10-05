import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import VerifyEmail from "./routes/VerifyEmail";
import ForgotPassword from "./routes/ForgotPassword";
import ResetPassword from "./routes/ResetPassword";
import { AppLayout } from "@/components/layouts/AppLayout";
import Home from "./routes/Home";

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