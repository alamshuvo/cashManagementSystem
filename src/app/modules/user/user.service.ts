
import { IUser } from "./user.interface";
import { userModel } from "./user.model";
const createUserService =async (payload: IUser) => {
    const user = await userModel.create(payload);
    return user;
};

export const userService = {
  createUserService,
};
