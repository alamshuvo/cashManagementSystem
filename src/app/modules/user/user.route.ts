import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.interface";


const userRoute = Router();

userRoute.post('/create-user', userController.createUser)
userRoute.get('/get-all-users',auth(USER_ROLE.ADMIN), userController.getAllUsers)
userRoute.get('/get-me',auth(USER_ROLE.ADMIN,USER_ROLE.USER),userController.getMe)

export default userRoute
