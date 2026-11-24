import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../config/queryClient";
import type { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {children}
                <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
            </BrowserRouter>
        </QueryClientProvider>
    );
};