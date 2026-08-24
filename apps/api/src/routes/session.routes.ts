import express from "express";
import * as SessionController from "../controllers/session.controller";

const router = express.Router();

router.get("/", SessionController.getSessionsHandler);

export default router;