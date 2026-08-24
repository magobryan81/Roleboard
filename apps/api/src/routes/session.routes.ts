import express from "express";

const router = Router();

router.get("/", SessionController.getSessions)