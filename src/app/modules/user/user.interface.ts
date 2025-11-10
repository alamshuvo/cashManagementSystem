import { Model } from "mongoose"

export const USER_ROLE={
    ADMIN:'admin',
    USER:'user'
}
export interface IUser{
    name:string
    email:string
    password:string
    role?: keyof typeof USER_ROLE
}
export interface UserModela extends Model<IUser> {
    isUserExistsByEmail(email: string): Promise<IUser>
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string
    ): Promise<boolean>
  }
export type TUserRole = keyof typeof USER_ROLE;