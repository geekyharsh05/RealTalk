import { Request, RequestHandler, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler.util";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public signUp: RequestHandler = asyncHandler(
    async (req: Request, res: Response) => {
      const result = await this.authService.signUp(req.body, res);
      return {
        message: "User created successfully",
        ...result,
      };
    },
  );

  public signIn: RequestHandler = asyncHandler(
    async (req: Request, res: Response) => {
      const result = await this.authService.signIn(req.body, res);
      return {
        message: "User signed in successfully",
        ...result,
      };
    },
  );

  public signOut: RequestHandler = asyncHandler(async (_, res: Response) => {
    await this.authService.signOut(res);
    return {
      message: "User signed out successfully",
    };
  });

  public updateProfile: RequestHandler = asyncHandler(
    async (req: Request, res: Response) => {
      const userId = req.user._id;
      const result = await this.authService.editProfile(req.body, userId);
      return {
        message: "User updated successfully",
        ...result,
      };
    },
  );

  public getUser: RequestHandler = asyncHandler(async (req: Request) => {
    const result = await this.authService.verifyAuth(req);
    return {
      message: "User retrieved successfully",
      result,
    };
  });
}
