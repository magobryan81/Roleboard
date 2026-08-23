import express from "express";
import * as UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getUserHandler);

export default router;