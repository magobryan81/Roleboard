import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../ui/Spinner";

export const AppLayout = () => {
    const {user, isLoading} = useAuth();

    return isLoading ? (
        <div className="flex items-center justify-center">
            <Spinner></Spinner>
        </div>
    ) : user ? (
        <main className="flex w-full min-h-screen">
            <Outlet/>
        </main>
    ) : (
        <Navigate
            to="/"
            replace
            state={{
                redirectUrl: window.location.pathname,
            }}
        />
    );
};