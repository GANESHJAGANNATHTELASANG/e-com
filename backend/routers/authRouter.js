import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/authControllers.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuth, getUser);

export default router;
