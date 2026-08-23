import express from "express";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", AuthController.registerHandler);
router.post("/login", AuthController.loginHandler);
router.get("/logout", AuthController.logoutHandler)
router.get("/refresh", AuthController.refreshHandler);
router.get("/email/verify/:code", AuthController.verifyEmailHandler);
router.post("/password/forgot", AuthController.sendPasswordResetHandler);
router.post("/password/reset", AuthController.resetPasswordHandler);

export default router