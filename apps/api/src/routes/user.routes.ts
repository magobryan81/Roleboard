import express from "express";
import * as UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getUserHandler);
router.patch("/name", UserController.updateNameHandler);
router.patch("/email", UserController.updateEmailHandler);
router.get("/verify/email/:code", UserController.verifyEmailHandler);

export default router;