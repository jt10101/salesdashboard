const { z } = require("zod");

function validate(schema, data) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }
  return parsed.data;
}

const signInSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(/^[a-z0-9_-]+$/, "Invalid username format"),
  password: z
    .string()
    .min(8, "Password needs to be at least 8 characters long."),
});

module.exports = { signInSchema, validate };
