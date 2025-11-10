import { Router } from "express";
import { userController } from "./user.controller";


const userRoute = Router();

userRoute.post('/create-user', userController.createUser)


export default userRoute
