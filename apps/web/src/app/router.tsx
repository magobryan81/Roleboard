import { Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import RegisterRoute from "./routes/register";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegisterRoute />} />
        </Routes>
    );
};