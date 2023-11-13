import { Router } from "express";
import { projectController } from "../http/controllers/project.controller.js";
import { checkLogin } from "../http/middlewares/checkLogin.js";
import { projectValidator } from "../http/validations/project.validation.js";
import { authValidatorMapper } from "../http/middlewares/auth.validatorMapper.js";
import { fileUploadProject } from "../modules/fileUploadProject.js";
import fileUpload from "express-fileupload"
const projectRouter = Router()

projectRouter.post('/create',
fileUpload(),
checkLogin,
fileUploadProject,
projectValidator(),
authValidatorMapper,
projectController.createProject)

export default projectRouter