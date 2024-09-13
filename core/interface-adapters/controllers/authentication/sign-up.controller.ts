import { z } from "zod";

import { Session } from "@/core/entities/models/session";

import { signUpUseCase } from "@/core/application/use-cases/authentication/sign-up.use-case";
import {
  AuthenticationError,
  InputParseError,
} from "@/core/entities/custom-errors/errors";

const inputSchema = z.object({
  email: z.string().email({
    message: "Invalid email, use user@example.com.",
  }),
  password: z
    .string({
      required_error: "Password required.",
    })
    .min(6, {
      message: "Password needs 6+ characters, numbers, and letters.",
    })
    .max(31, {
      message: "Password can’t exceed 31 characters.",
    }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(31, {
      message: "Username can’t exceed 31 characters.",
    }),
});

export async function signUpController(
  input: z.infer<typeof inputSchema>
): Promise<Session> {
  const { data, error: inputParseError } = inputSchema.safeParse(input);

  if (inputParseError) {
    const errors = inputParseError.flatten((e) => e.message);

    throw new InputParseError("Invalid data", {
      ...errors.fieldErrors,
    });
  }

  try {
    const { session } = await signUpUseCase(data);
    return session;
  } catch (error: any) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    console.log("Error in signUpController:", error);
    throw new Error("Internal Server Error");
  }
}
