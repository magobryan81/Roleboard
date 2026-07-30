import express from "express";
import * as UsersController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", UsersController.registerHandler);

export default router