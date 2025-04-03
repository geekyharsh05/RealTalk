import { Request, RequestHandler, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler.util';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public signUp: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.signUp(req.body, res);
    return {
      message: 'User created successfully',
      ...result
    };
  });

  public signIn: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.signIn(req.body, res);
    return {
      message: 'User signed in successfully',
      ...result
    };
  });

  public signOut: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    await this.authService.signOut(res);
    return {
      message: 'User signed out successfully'
    };
  });

  // public updateProfile: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  //   const result = await this.authService.editProfile(req.body);
  //   return {
  //     message: 'User signed out successfully'
  //   };
  // });

  public getUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.verifyAuth(req, res);
    return {
      message: 'User retrieved successfully'
    };
  });

}
