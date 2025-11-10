import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { Request, Response } from "express";
import { IUser } from "./user.interface";


const createUser = catchAsync(async (req:Request, res:Response) => {
  const payload = req.body;
  const result = await userService.createUserService(payload);
  sendResponse(res, {
    sucess: true,
    message: "User created successflly",
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllUsers = catchAsync(async (req:Request, res:Response) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    sucess: true,
    message: "all users retrived successflly",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getMe = catchAsync(async (req:Request, res:Response) => {
  const result = await userService.getMe(req.user as IUser);
  sendResponse(res, {
    sucess: true,
    message: "user retrived sucessfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});
export const userController = {
  createUser,
  getAllUsers,
  getMe,
};
