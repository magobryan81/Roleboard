import type { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex w-full min-h-screen">
            {children}
        </main>
    )
};