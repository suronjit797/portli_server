import config from "../../config";
import { ApiError } from "../../global/globalError";
import { CustomJwtPayload } from "../../global/globalInterfaces";
import { extractToken } from "../../middleware/auth";
import { mailTemplate } from "../../utils/makeEmailTemplate";
import sendEmail from "../../utils/sendMail";
import type { TUser } from "./user.interface";
import UserModel from "./user.model";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginRes = { accessToken: string; refreshToken: string };

// other services
const login = async (payload: LoginPayload): Promise<LoginRes> => {
  // Find user by email
  const user = await UserModel.findOne({ $or: [{ email: payload.email }, { loginId: payload.email }] }).select(
    "+password"
  );
  console.log({ user });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password as string);
  console.log({ isPasswordValid });
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // Create access and refresh tokens
  const accessToken = jwt.sign({ userId: user._id }, config.token.access_token_secret, {
    expiresIn: config.token.access_token_time,
  });

  const refreshToken = jwt.sign({ userId: user._id }, config.token.refresh_token_secret, {
    expiresIn: config.token.refresh_token_time,
  });

  return { accessToken, refreshToken };
};

const forgotPassword = async (email: string): Promise<void> => {
  try {
    const user = await UserModel.findOne({ $or: [{ email: email }, { loginId: email }] });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User");
    }

    const token = jwt.sign({ userId: user._id }, config.token.access_token_secret, {
      expiresIn: config.token.access_token_time,
    });

    const link = `${config.FRONTEND_URL}/reset-password/${token}`;

    const text = mailTemplate({
      fileName: "forgotPassword",
      name: user.name,
      email,
      link,
    });

    await sendEmail({ email, subject: "UBB Amanah Berhad Password Reset", text });
    return;
  } catch {
    throw new Error("Reset Password Failed");
  }
};

type resetPayload = { token: string; password: string };

const resetPassword = async (payload: resetPayload): Promise<TUser | null> => {
  console.log(payload);
  try {
    let token = extractToken(payload.token);
    console.log(token);
    if (!token) throw new Error(`Invalid Request`);

    const decoded = jwt.verify(token, config.token.access_token_secret) as CustomJwtPayload;
    console.log(decoded);
    const user = UserModel.findById(decoded?._id);
    console.log(user);
    if (!user) throw new Error(`Invalid Request`);

    const salt = await bcrypt.genSalt(config.salt_round);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const data = await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });

    return data;
  } catch {
    throw new Error("Reset Password Failed");
  }
};

const userService = { login, forgotPassword, resetPassword };

export default userService;
