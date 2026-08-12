import express from "express";
import * as UsersController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", UsersController.registerHandler);
router.post("/login", UsersController.loginHandler);
router.get("/logout", UsersController.logoutHandler)
router.get("/refresh", UsersController.refreshHandler);
router.get("/email/verify/:code", UsersController.verifyEmailHandler);
router.post("/password/forgot", UsersController.sendPasswordResetHandler);

export default router