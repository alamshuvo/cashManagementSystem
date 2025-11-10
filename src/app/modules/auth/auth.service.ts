import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { userModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const loginUser = async(payload:ILoginUser)=>{
    const userExist = await userModel.isUserExistsByEmail(payload.email);
    if (!userExist) {
        throw new AppError(StatusCodes.NOT_FOUND,"this user is not found in database ")
    }
    // check if the password is correct 
    const isPasswordMatched = await userModel.isPasswordMatched(payload.password,userExist.password);
    if (!isPasswordMatched) {
        throw new AppError(StatusCodes.UNAUTHORIZED,"password is incorrect")
    }
    const jwtPayload = {
        email: userExist.email,
        role: userExist.role,
        name:userExist.name
    }
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    )
    return {
        accessToken
    }
}
export const AuthService = {
    loginUser
}