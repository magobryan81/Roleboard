import express from "express";
import * as JobController from "../controllers/job.controller";

const router = express.Router();

router.post("/create", JobController.createJobHandler);
router.get("/", JobController.getJobHandler);
router.get("/:jobId", JobController.getSingleJobHandler);
router.patch("/:jobId", JobController.updateJobHandler)
router.patch("/:jobId/archived", JobController.archiveJobHandler);
router.patch("/:jobId/unarchived", JobController.unarchiveJobHandler);
router.patch("/:jobId/interview/stage", JobController.updateJobInterviewStageHandler);
router.post("/:jobId/note", JobController.createNoteHandler);
router.patch("/:jobId/note/:noteId", JobController.updateNoteHandler);

export default router;