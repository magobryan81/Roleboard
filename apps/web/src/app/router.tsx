import { Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";
import VerifyEmail from "./routes/verifyEmail";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email/verify/:code" element={<VerifyEmail />} />
        </Routes>
    );
};