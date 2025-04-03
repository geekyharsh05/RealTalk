import { SignInInput, signInSchema, SignUpInput, signUpSchema } from "@repo/validators";
import { validateSchema } from "../utils/validateSchema.util";
import { AuthResponse } from "../types/response.types";
import User from "../models/user.model";
import { ApiError } from "../utils/apiError.util";
import { generateToken } from "../utils/generateToken.util";
import type { Request, Response } from "express";
import { formatUserResponse } from "../utils/format.util";

export class AuthService {
    public async signUp(input: SignUpInput, res: Response): Promise<AuthResponse>  {
        const validatedData: SignUpInput = validateSchema(signUpSchema, input);

        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
          throw new ApiError(400, 'User already exists');
        }

        const user = await User.create(validatedData);
        const token = generateToken(user._id.toString(), res);

        return {
            token,
            user: formatUserResponse(user),
          };
    }

    public async signIn(input: SignInInput,  res: Response): Promise<AuthResponse> {
        const validatedData: SignInInput = validateSchema(signInSchema, input);

        const user = await User.findOne({email: validatedData.email});
        if (!user) {
            throw new ApiError(400, 'User does not exist');
        }

        const isValidPassword = await user.isPasswordCorrect(validatedData.password);
        if (!isValidPassword) {
            throw new ApiError(400, 'Incorrect Credentials');
        }

        const token = generateToken(user._id.toString(), res);

        return {
          token,
          user: formatUserResponse(user)
        };
    }

    public async signOut(res: Response) {
        return res.clearCookie("jwt");
    }

    // public async editProfile(input) {

    // }

    public async verifyAuth(req: Request) {
        return req.user;
    }
}
