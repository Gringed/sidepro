import { z } from "zod";

export const RequestSchema = z.object({
  randomUsername: z.string(),
  name: z.string().max(100, "100 characters max"),
  userId: z.string(),
  description: z.string().max(1000, "1000 characters max"),
  price: z.string(),
});

export type RequestType = z.infer<typeof RequestSchema>;
