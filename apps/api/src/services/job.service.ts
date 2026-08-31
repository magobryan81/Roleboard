import { JobModel } from "../models/job.model";
import catchErrors from "../utils/catchErrors";

type InterviewParams = {
    stage: string;
    date?: Date | undefined;
    notes?: string | undefined;
}

type CreateJobApplicationParams = {
    // job details
    jobTitle: string;
    company: string;
    companyUrl?: string | undefined;
    jobPostingUrl?: string | undefined;
    location?: string | undefined;
    employmentType?: "Full-time" | "Part-time" | "Contract" | "Internship" | undefined;
    salary: number;
    description?: string | undefined;
    responsibilities: string[];
    requirements?: string[] | undefined;

    // application details
    status: "Saved" | "Applied" | "Interviewing" | "Offer" | "Rejected" | "Withdrawn";
    dateApplied?: Date | undefined;
    source?: string | undefined;

    // people
    contactName?: string | undefined;
    contactEmail?: string | undefined;
    referralName?: string | undefined;

    // process
    interviews?: InterviewParams[] | undefined;
    nextActionDate?: Date | undefined;
    notes?: string | undefined;
};

export const createJobApplication = async(
    userId: string,
    data: CreateJobApplicationParams
) => {
    // create job application
    const job = await JobModel.create({
        ...data,
        userId,
    });

    // return
    return { job };
}