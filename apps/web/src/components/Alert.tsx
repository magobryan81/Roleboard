import type { ReactNode } from "react"
import { BadgeCheck, BadgeAlert } from "lucide-react";

type Variant = "success" | "error";

const styles: Record<Variant, string> = {
    success: "bg-[#DFF2BF] text-[#166534]",
    error: "bg-[#FFBABA] text-[#991B1B]",
}

const icons = {
    success: BadgeCheck,
    error: BadgeAlert,
}

type AlertProps = {
    variant: Variant;
    children: ReactNode;
}

const Alert = ({variant, children}: AlertProps) => {
    const Icon = icons[variant];
    return (
        <div
            role={variant === "error" ? "alert" : "status"}
            className={`flex items-center justify-center gap-2 px-3 py-2 ${styles[variant]}`}
        >
            <Icon className="size-5 shrink-0" aria-hidden="true"/>
            <span>{children}</span>
        </div>
    )
}

export default Alert