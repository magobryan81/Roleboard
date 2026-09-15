import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: ReactNode;
}

const Button = ({ isLoading = false, disabled, children, className = "", ...props}: ButtonProps) => {
    return (
        <button
            disabled={disabled || isLoading}
            className={`w-full rounded sm bg-green-50 py-2 disabled:opacity-50 ${className}`}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    )
};

export default Button;