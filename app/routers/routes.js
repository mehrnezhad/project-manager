import { Router } from "express";
import authRouter from "./auth.routers.js";
import userRouter from "./user.routers.js";
import teamRouter from "./team.routers.js";
import projectRouter from "./project.routers.js";


const AllRouter = Router()
AllRouter.use("/auth",authRouter)
AllRouter.use("/user",userRouter)
AllRouter.use("/team",teamRouter)
AllRouter.use("/project",projectRouter)



export default AllRouter