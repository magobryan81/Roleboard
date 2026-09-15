import type { ReactNode } from "react";

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex w-full min-h-screen">
            {children}
        </main>
    )
};