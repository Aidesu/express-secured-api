import express from "express";
import { register, login } from "../controllers/usersController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", verifyToken, (req, res) =>
    res.json({ message: "Welcome " + req.user.username })
);

export default router;
