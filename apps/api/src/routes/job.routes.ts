import express from "express";
import * as JobController from "../controllers/job.controller";

const router = express.Router();

router.post("/create", JobController.createJobHandler);
router.patch("/:jobId", JobController.updateJobHandler)
router.get("/", JobController.getJobHandler);

export default router;