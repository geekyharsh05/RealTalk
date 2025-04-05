import { z, ZodType } from "zod";
import { signUpSchema, signInSchema } from "./schema/user.schema";

export * from "./schema/user.schema";
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export { ZodType };
