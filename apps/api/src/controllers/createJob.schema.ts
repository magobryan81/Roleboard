import { z } from "zod";

export const interviewStageSchema = z.object({
    stage: z.string().min(1, "Stage is required"),
});

export const interviewNoteSchema = z.object({
    text: z.string().min(1),
    createdAt: z.coerce.date().optional(),
});

const interviewSchema = z.object({
    stage: z.string().min(1).optional(),
    date: z.coerce.date().optional(),
    notes: z.array(interviewNoteSchema).optional(),
});


export const createJobApplicatonSchema = z.object({
    // job details
    jobTitle: z.string().min(1).max(255),
    company: z.string().min(1).max(255),
    companyUrl: z.string().url().optional(),
    jobPostingUrl: z.string().url().optional(),
    location: z.string().min(1).max(255).optional(),
    employmentType: z.enum(["Full-time", "Part-time", "Contract", "Internship"]).optional(),
    salary: z.number().nonnegative(),
    description: z.string().min(1).max(255),
    responsibilities: z.array(z.string()).min(1).max(255),
    requirements: z.array(z.string()).min(1).max(255).optional(),

    // application tracking
    status: z.enum(["Saved", "Applied", "Interviewing", "Offer", "Rejected", "Withdrawn"]).default("Saved"),
    dateApplied: z.coerce.date(),
    source: z.string().optional(),

    // people
    contactName: z.string().optional(),
    contactEmail: z.string().email("Invalid Email").optional(),
    referralName: z.string().optional(),

    // process / follow-up
    interview: interviewSchema.optional(),
    nextActionDate: z.coerce.date().optional(),
    notes: z.string().optional(),

    // archived job application
    // archived: z.boolean().default(false),
    // archivedAt: z.coerce.date(),
});

export const updateJobApplicationSchema = createJobApplicatonSchema.partial();

