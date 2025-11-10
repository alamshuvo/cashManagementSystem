import { model, Schema } from "mongoose";
import { IUser, UserModela } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser,UserModela>(
  {
    name: {
      type: String,
      required: [true, "name must be needed"],
    },
    email: {
      type: String,
      required: [true, "email must be needed"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round))
    next()
  })
  
  userSchema.post('save', function (doc, next) {
    doc.password = ''
    next()
  })

  userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await userModel.findOne({ email }).select('+password')
  }
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
  }
export const userModel = model<IUser,UserModela>("users", userSchema);
