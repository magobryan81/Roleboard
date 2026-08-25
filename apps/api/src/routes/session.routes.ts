import express from "express";
import * as SessionController from "../controllers/session.controller";

const router = express.Router();

router.get("/", SessionController.getSessionsHandler);
router.delete("/:id", SessionController.deleteSessionHandler);

export default router;