import { CREATED, UNAUTHORIZED, OK, BAD_REQUEST, NOT_FOUND } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { createJobApplicatonSchema, updateJobApplicationSchema, interviewStageSchema } from "./job.schema";
import { createNoteSchema, updateNoteSchema } from "./note.schema";
import { createJobApplication, updateJobApplication, updateArchived, updateUnarchived, updateJobInterviewStage, createNote, updateNote } from "../services/job.service";
import appAssert from "../utils/appAssert";
import { JobModel } from "../models/job.model";
import mongoose from "mongoose";

export const getJobHandler = catchErrors(async (req, res) => {
    const userId = req.userId.toString();
    appAssert(userId, UNAUTHORIZED, "Not Authorized");
    const jobs = await JobModel.find({
        userId,
        archived: { $ne: true },
    }).sort({createdAt: -1});
    appAssert(jobs, NOT_FOUND, "No existing job application");
    return res.status(OK).json({jobs});
});

export const getSingleJobHandler = catchErrors(async (req, res) => {
    const userId = req.userId.toString();
    const jobId = req.params.jobId as string;

    appAssert(userId, UNAUTHORIZED, "Not Authorized");
    appAssert(jobId, BAD_REQUEST, "Job ID is missing");

    const job = await JobModel.findById({
        userId,
        _id: jobId,
        archived: { $ne: true },
    })
    appAssert(job, NOT_FOUND, "No existing job application");
    return res.status(OK).json({job});
})

export const createJobHandler = catchErrors(async (req, res) => {
    // validate request
    const request = createJobApplicatonSchema.parse({
        ...req.body,
    });

    // check userId
    appAssert(req.userId, UNAUTHORIZED, "Not Authorized");
    const userId = req.userId;
    
    // call service

    const { job } = await createJobApplication(userId, request);
    
    // return

    return res.status(CREATED).json({
        job,
        message: "Job application successfully added",
    })
});

export const updateJobHandler = catchErrors(async (req, res) => {
    const jobId = req.params.jobId as string;
    const userId = req.userId;
    
    // check two job and user id
    appAssert(jobId, BAD_REQUEST, "Job ID is missing");
    appAssert(userId, UNAUTHORIZED, "Not Authorized");

    const request = updateJobApplicationSchema.parse(req.body);

    const { job } = await updateJobApplication(userId, jobId, request);

    return res.status(OK).json({
        job,
        message: "Job application successfully updated",
    });
});

export const archiveJobHandler = catchErrors(async (req, res) => {
    const jobId = req.params.jobId as string;
    const userId = req.userId;

    appAssert(jobId, BAD_REQUEST, "Job ID is required");
    appAssert(userId, UNAUTHORIZED, "Not Authorized");

    await updateArchived(
        true,
        userId.toString(),
        jobId,
    );

    return res.status(OK).json({
        message: "Job application successfully archived",
    });
});

export const unarchiveJobHandler = catchErrors(async (req, res) => {
    const jobId = req.params.jobId as string;
    const userId = req.userId;

    appAssert(jobId, BAD_REQUEST, "Job ID is required");
    appAssert(userId, UNAUTHORIZED, "Not Authorized");

    await updateUnarchived(
        false,
        userId.toString(),
        jobId,
    );

    return res.status(OK).json({
        message: "Job Application successfully unarchived",
    });
});

export const updateJobInterviewStageHandler = catchErrors(async (req, res) => {
    const jobId = req.params.jobId as string;
    const userId = req.userId;

    appAssert(jobId, BAD_REQUEST, "Job ID is required");
    appAssert(userId, UNAUTHORIZED, "Not Authorized");

    const { stage } = interviewStageSchema.parse(req.body);

    const { job } = await updateJobInterviewStage(userId.toString(), jobId, stage);

    return res.status(OK).json({
        job,
        message: "Job interview stage successfully updated",
    });
});

export const createNoteHandler = catchErrors(async (req, res) => {
    const jobId = req.params.jobId as string;
    const userId = req.userId;

    appAssert(userId, UNAUTHORIZED, "Not Authorized");

    const request = createNoteSchema.parse({...req.body});

    const { note } = await createNote(userId, jobId, request);

    return res.status(CREATED).json({
        note,
        message: "Note successfully added",
    });
});

export const updateNoteHandler= catchErrors(async (req, res) => {
    const userId = req.userId;
    const jobId = req.params.jobId as string;
    const noteId = req.params.noteId as string;

    appAssert(userId, UNAUTHORIZED, "Not Authorized");
    appAssert(mongoose.isValidObjectId(jobId), BAD_REQUEST, "Job ID is required");
    appAssert(mongoose.isValidObjectId(noteId), BAD_REQUEST, "Note ID is required");

    const request = updateNoteSchema.parse(req.body);

    const { note } = await updateNote(userId, jobId, noteId, request);

    return res.status(OK).json({
        note,
        message: "Note updated successfully",
    });
});

