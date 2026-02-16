import { z } from "zod";

export const subscribeSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(320, "Email is too long"),
  source: z.string().max(50).optional().default("footer"),
});
