import express from "express";
import * as JobController from "../controllers/job.controller";

const router = express.Router();

router.post("/create", JobController.createJobHandler);
router.patch("/:id", JobController.updateJobHandler)

export default router;