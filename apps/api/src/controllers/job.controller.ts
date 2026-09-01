import { CREATED, UNAUTHORIZED, OK, BAD_REQUEST, NOT_FOUND } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { createJobApplicatonSchema, updateJobApplicationSchema } from "./createJob.schema";
import { createJobApplication, updateJobApplication } from "../services/job.service";
import appAssert from "../utils/appAssert";
import { JobModel } from "../models/job.model";

export const getJobHandler = catchErrors(async (req, res) => {
    const { jobId } = req.params;
    appAssert(jobId, BAD_REQUEST, "Job ID is required");

    const job = await JobModel.findById(jobId);
    appAssert(job, NOT_FOUND, "Job Application not found");
    return res.status(OK).json(job);
});

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
    const jobId = req.params.id as string;
    const request = updateJobApplicationSchema.parse(req.body);

    // check two job and user id
    appAssert(jobId, BAD_REQUEST, "Job ID is required");
    appAssert(req.userId, UNAUTHORIZED, "NOT Authorized");
    
    const userId = req.userId;

    const { job } = await updateJobApplication(userId, jobId, request);

    return res.status(OK).json({
        job,
        message: "Job application successfully updated",
    });
});