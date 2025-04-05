import { ZodType } from "@geekyharsh/realtalk";
import { ApiError } from "./apiError.util";

export const validateSchema = <T>(schema: ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));

    throw new ApiError(400, "Validation failed", errors);
  }

  return result.data;
};
