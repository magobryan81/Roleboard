import { FolderKanban, NotebookText, CalendarDays, Archive, FileUser, Mail, type LucideIcon } from "lucide-react";


export type NavItem = {
    to?: string;
    label: string;
    icon?: LucideIcon;
    end?: boolean
    children?: NavItem[];
}

export const navbar: NavItem[] = [
    { 
        label: "Jobs",
        children: [
            { to: "/home",  label: "Board", icon: FolderKanban, end: true, },
            { to: "/calendar", label: "Calendar", icon: CalendarDays, },
            { to: "/calendar", label: "Archived", icon: Archive, }
        ]
    },
    {
        label: "Notes",
        children: [
            { to: "/jobs",  label: "Notes", icon: NotebookText, },
        ]
    },
    { 
        label: "Resume & Cover Letter",
        children: [
            { to: "/jobs",  label: "Resume", icon: FileUser, },
            { to: "/calendar", label: "Cover Letter", icon: Mail, }
        ]
    },
]