import { z, ZodType } from 'zod';
import { signUpSchema, signInSchema } from './schemas/user.schema';

export * from "./schemas/user.schema";
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export { ZodType };
