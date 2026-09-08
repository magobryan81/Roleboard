import { JobModel } from "../models/job.model";
import appAssert from "../utils/appAssert";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http";
import { Types } from "mongoose";

type InterviewNoteParams = {
    text?: string;
    createdAt?: Date;
}

type InterviewParams = {
    stage?: string | undefined;
    date?: Date | undefined;
    notes?: InterviewNoteParams[];
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
    description: string;
    responsibilities: string[];
    requirements?: string[] | undefined;

    // application details
    status: "Saved" | "Applied" | "Interviewing" | "Offer" | "Rejected" | "Withdrawn";
    dateApplied: Date;
    source?: string | undefined;

    // people
    contactName?: string | undefined;
    contactEmail?: string | undefined;
    referralName?: string | undefined;

    // process
    interview?: InterviewParams | undefined;
    nextActionDate?: Date | undefined;
    notes?: string | undefined;
};

export const createJobApplication = async(
    userId: Types.ObjectId,
    data: CreateJobApplicationParams
) => {
    // create job application
    const job = await JobModel.create({
        ...data,
        userId,
    });

    // return
    return { job };
};

export const updateJobApplication = async(
    userId: Types.ObjectId,
    jobId: string,
    update: Partial<CreateJobApplicationParams>
) => {
    const job = await JobModel.findOneAndUpdate(
        { _id: jobId, userId},
        { $set: update },
        { 
            new: true,
            runValidators: true
        }
    );

    appAssert(job, NOT_FOUND, "Job Application not found");
    
    return { job };
}


export const updateArchived = async(
    archived: boolean,
    userId: string,
    jobId: string, 
) => {
    const updatedJob = await JobModel.findOneAndUpdate(
        {_id: jobId, userId},
        { $set: { archived, archivedAt: archived ? new Date() : null }},
        {
            new: true,
        },
    );

    appAssert(updatedJob, NOT_FOUND, "Job Application not found");

    return { updatedJob };
}

export const updateUnarchived = async(
    archived: boolean,
    userId: string,
    jobId: string,
) => {
    const updatedJob = await JobModel.findOneAndUpdate(
        {_id: jobId, userId},
        { $set: { archived, archivedAt: archived ? new Date : null}},
        {
            new: true,
        },
    );

    appAssert(updatedJob, NOT_FOUND, "Job Application not found");

    return { updatedJob };
}

export const updateJobInterviewStage = async(
    userId: string,
    jobId: string,
    stage: string,
) => {
    const job = await JobModel.findOneAndUpdate(
        {_id: jobId, userId},
        { $set: { "interview.stage": stage } },
        { new: true }
    );

    appAssert(job, INTERNAL_SERVER_ERROR, "Failed to update job interview stage");

    return { job }
};

export const updateJobInterviewNote = async(
    userId: string,
    jobId: string,
    text: string,
) => {
    const job = await JobModel.findOneAndUpdate(
        {_id: jobId, userId},
        { $push: { "interview.stage": { text, createdAt: new Date() } }},
        { new: true }
    );

    appAssert(job, INTERNAL_SERVER_ERROR, "Failed to add notes");

    return { job }
}