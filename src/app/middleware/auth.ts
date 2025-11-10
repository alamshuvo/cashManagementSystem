/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";

import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import AppError from "../error/AppError";
import { CustomJwtPayload } from "../interface";
import { userModel } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // Check if the token is sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }
    try {
      // Verify the token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as CustomJwtPayload;

      const { email, role, id } = decoded;

      // Check if the user exists
      const user = await userModel.isUserExistsByEmail(email);
      if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, "This user is not found");
      }

      // Check if the user has the required role
      if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
      }

      // Attach user details to the request
      req.user = { email, id, role, password: user.password, name: user.name };

      next();
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
    }
  });
};

export default auth;
