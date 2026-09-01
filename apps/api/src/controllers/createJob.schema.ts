import { z } from "zod";

const interviewSchema = z.object({
    stage: z.string().min(1, "Stage is required"),
    date: z.coerce.date().optional(),
    notes: z.string().optional(),
})

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
    interviews: z.array(interviewSchema).optional(),
    nextActionDate: z.coerce.date().optional(),
    notes: z.string().optional(),
});

export const updateJobApplicationSchema = createJobApplicatonSchema.partial();

