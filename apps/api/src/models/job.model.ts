import { Schema, model, Document, Types } from "mongoose";

interface Interview {
    stage: string;
    date?: Date;
    notes?: string;
}

const interviewSchema = new Schema<Interview>(
    {
    stage: { type: String, required: true },
    date: { type: Date },
    notes: { type: String },
    },
    {_id: false} // no separate _id needed for each interview entry
);

export interface JobDocument extends Document {
    // job details
    jobTitle: string;
    company: string;
    companyUrl?: string;
    jobPostingUrl?: string
    location?: string;
    employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salary: number;
    description: string;
    responsibilities: string[];
    requirements?: string[];

    // application tracking
    status: "Saved" | "Applied" | "Interviewing" | "Offer" | "Rejected" | "Withdrawn";
    dateApplied: Date;
    statusUpdatedAt?: Date;
    source?: string;

    // people
    contactName?: string;
    contactEmail?: string;
    referralName?: string;

    // process / follow-up
    interviews?: Interview[];
    nextActionDate?: Date;
    notes?: string;

    // ownership
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;

    // archive
    archived: Boolean;
    archivedAt?: Date | null;
}

const applicationSchema = new Schema<JobDocument>(
    {
        // job details
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        companyUrl: { type: String },
        jobPostingUrl: { type: String },
        location: { type: String },
        employmentType: { 
            type: String,
            enum: ["Full-time", "Part-time", "Contract", "Internship"] },
        salary: { type: Number },
        description: { type: String, required: true },
        responsibilities: { type: [String], default: [] },
        requirements: { type: [String], default: [] },

        // application tracking
        status: { 
            type: String,
            enum: ["Saved", "Applied", "Interviewing", "Offer", "Rejected", "Withdrawn"],
            required: true,
            default: "Saved" },
        dateApplied: { type: Date, required: true },
        statusUpdatedAt: { type: Date },
        source: { type: String },

        // people
        contactName: { type: String },
        contactEmail: { type: String },
        referralName: { type: String },

        // process / follow-up
        interviews: { type: [interviewSchema], default: [] },
        nextActionDate: { type: Date },
        notes: { type: String },

        // ownership
        userId: { 
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // archive
        archived: {
            type: Boolean,
            default: false
        },
        archivedAt: {
            type: Date,
            default: null,
        }
    },
    { timestamps: true }
);

export const JobModel = model<JobDocument>('Job', applicationSchema);

