
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import { userModel } from "./user.model";
const createUserService =async (payload: IUser) => {
    const user = await userModel.create(payload);
    return user;
};
const getAllUsers = async () => {
    const users = await userModel.find();
    return users;
  }

const getMe = async(user:IUser)=>{
    const me = await userModel.isUserExistsByEmail(user.email);
    if (!me) {
        throw new AppError(StatusCodes.NOT_FOUND,"User not found");
        
    }
    return me;
}
export const userService = {
  createUserService,
  getAllUsers,
  getMe
};
