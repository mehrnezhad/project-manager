import { Router } from "express";
import { authController } from "../http/controllers/auth.controller.js";

const authRouter = Router()
authRouter.get("/register",authController.register)

export default authRouter