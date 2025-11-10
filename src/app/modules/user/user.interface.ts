import { Model } from "mongoose"

export const USER_ROLE={
    ADMIN:'admin',
    USER:'user'
} as const
export interface IUser{
    name:string
    email:string
    password:string
    role?: TUserRole
}
export interface UserModela extends Model<IUser> {
    isUserExistsByEmail(email: string): Promise<IUser>
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string
    ): Promise<boolean>
  }
  export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];