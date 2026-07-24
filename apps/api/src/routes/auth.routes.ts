import express from "express";
import * as UsersController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", UsersController.getUsers);
router.get("/:userID", UsersController.getUsers);
router.post('/register', UsersController.createUser);
router.patch('/:userID', UsersController.updateUser);
// router.post('/logout', logout);
// router.get('/me', protect, getMe);

export default router