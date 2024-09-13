import { z } from "zod";

export const sessionSchema = z.object({
  token: z.string(),
  userId: z.string(),
  expiresIn: z
    .union([z.date(), z.string(), z.number()])
    .transform((val) => new Date(val)),
});

export type Session = z.infer<typeof sessionSchema>;
