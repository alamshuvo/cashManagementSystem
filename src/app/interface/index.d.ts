import { TUser } from "../modules/users/user.interface";

export interface CustomJwtPayload extends TUser {
  role: string;
  email: string;
  id: string;
  password: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}

export {};
