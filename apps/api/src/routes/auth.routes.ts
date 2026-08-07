import express from "express";
import * as UsersController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", UsersController.registerHandler);
router.post("/login", UsersController.loginHandler);
router.get("/logout", UsersController.logoutHandler)
router.get("/refresh", UsersController.refreshHandler);

export default router