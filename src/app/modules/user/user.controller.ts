import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userService.createUserService(payload);
  sendResponse(res, {
    sucess: true,
    message: "User created successflly",
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const userController = {
  createUser,
};
