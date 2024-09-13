import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6).max(255),
  username: z.string().min(3).max(31),
});

export type UserAuth = z.infer<typeof userSchema>;
export type UserProfile = Omit<UserAuth, "password">;
