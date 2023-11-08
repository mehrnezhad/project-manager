import { Router } from "express";
import { authController } from "../http/controllers/auth.controller.js";
import { authValidator , loginValidator} from "../http/validations/auth.validation.js";
import { authValidatorMapper } from "../http/middlewares/auth.validatorMapper.js";
const authRouter = Router()
authRouter.post("/register",authValidator(),authValidatorMapper,authController.register)
authRouter.post("/login",loginValidator(),authValidatorMapper,authController.login)

export default authRouter