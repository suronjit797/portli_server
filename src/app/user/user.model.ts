import { Schema, model } from "mongoose";
import { TUser, TUserDocument, TUserModel } from "./user.interface";
import { userRole } from "../../shared/constant";
import config from "../../config";
import bcrypt from "bcryptjs";

const userSchema = new Schema<TUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: Object.values(userRole), default: "user" },
    password: { type: String, required: true },
    phoneNumber: { required: true, type: String },

    subscribedPackage: String,
    uniqueSubDomain: { type: String, unique: true, sparse: true },
    selectedVariant: String,
    selectedTheme: Schema.Types.ObjectId, //! in future
  },
  { timestamps: true }
);

userSchema.pre<TUserDocument>("save", async function (next) {
  // if (!this.avatar || !this.avatar.url) {
  //   this.avatar = {
  //     name: this.name || "User",
  //     size: 0,
  //     status: "success",
  //     uid: new Date().getTime().toString(),
  //     url: `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name || "User")}&background=random`,
  //   };
  // }

  if (this.isModified("password")) {
    if (this.password) {
      try {
        const saltRounds = Number(config.salt_round);
        if (isNaN(saltRounds)) {
          console.error("Invalid salt_round in config. It must be a number.");
          return next(new Error("Server configuration error for password hashing."));
        }
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (error) {
        console.error("Error hashing password:", error);
        return next(error instanceof Error ? error : new Error("Error hashing password"));
      }
    }
  }
  next();
});

const UserModel = model<TUserDocument, TUserModel>("User", userSchema);

export default UserModel;
