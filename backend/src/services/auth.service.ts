import {
  SignUpInput,
  signUpSchema,
  SignInInput,
  signInSchema
} from "@geekyharsh/realtalk";
import { validateSchema } from "../utils/validateSchema.util";
import {
  AuthResponse,
  UpdateInput,
  UpdateResponse,
} from "../types/response.types";
import User from "../models/user.model";
import { ApiError } from "../utils/apiError.util";
import { generateToken } from "../utils/generateToken.util";
import type { Request, Response } from "express";
import { formatUserResponse } from "../utils/format.util";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../lib/cloudinary";

export class AuthService {
  public async signUp(
    input: SignUpInput,
    res: Response,
  ): Promise<AuthResponse> {
    const validatedData: SignUpInput = validateSchema(signUpSchema, input);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create(validatedData);
    const token = generateToken(user._id.toString(), res);

    return {
      token,
      user: formatUserResponse(user),
    };
  }

  public async signIn(
    input: SignInInput,
    res: Response,
  ): Promise<AuthResponse> {
    const validatedData: SignInInput = validateSchema(signInSchema, input);

    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      throw new ApiError(400, "User does not exist");
    }

    const isValidPassword = await user.isPasswordCorrect(
      validatedData.password,
    );
    if (!isValidPassword) {
      throw new ApiError(400, "Incorrect Credentials");
    }

    const token = generateToken(user._id.toString(), res);

    return {
      token,
      user: formatUserResponse(user),
    };
  }

  public async signOut(res: Response) {
    return res.clearCookie("jwt");
  }

  public async editProfile(
    input: UpdateInput,
    userId: string,
  ): Promise<UpdateResponse> {
    if (!input.profilePic) {
      throw new ApiError(400, "Profile pic is required");
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new ApiError(400, "User not found");
    }

    // Delete the existing image if it exists
    if (existingUser.profilePic) {
      await deleteImageFromCloudinary(existingUser.profilePic);
    }

    const imageUrl = await uploadImageToCloudinary(input.profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true },
    );

    if (!updatedUser) {
      throw new ApiError(400, "User update failed");
    }

    return {
      userId: updatedUser._id.toString(),
      profilePic: updatedUser.profilePic as string,
    };
  }

  public async verifyAuth(req: Request) {
    return req.user;
  }
}
