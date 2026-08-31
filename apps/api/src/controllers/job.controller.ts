import { CREATED, UNAUTHORIZED } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { createJobApplicatonSchema } from "./createJob.schema";
import { createJobApplication } from "../services/job.service";
import appAssert from "../utils/appAssert";

export const createJobHandler = catchErrors(async (req, res) => {
    // validate request
    const request = createJobApplicatonSchema.parse({
        ...req.body,
    });

    // check userId
    appAssert(req.userId, UNAUTHORIZED, "Not Authorized");
    const userId = req.userId.toString();
    
    // call service

    const { job } = await createJobApplication(userId, request);
    
    // return

    return res.status(CREATED).json({
        job,
        message: "Job application successfully added",
    })
});

export const updateJobHandler = catchErrors(async (req, res) => {
    
})