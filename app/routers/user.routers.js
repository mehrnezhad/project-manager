import { Router } from "express";
import { userController } from "../http/controllers/user.controller.js";
import { checkLogin } from "../http/middlewares/checkLogin.js";
import { uploadMulter } from "../modules/multer.js"
import { uploadImageValidation } from "../http/validations/user.validation.js";
import { authValidatorMapper } from "../http/middlewares/auth.validatorMapper.js";

const userRouter = Router()

userRouter.get("/profile", checkLogin, userController.getProfile)
userRouter.post("/profile", checkLogin, userController.updateProfile)
userRouter.post("/profile/uploadImageProfile",
uploadMulter.single("image"), 
checkLogin,
uploadImageValidation(),
authValidatorMapper,
userController.uploadImageProfile)

export default userRouter