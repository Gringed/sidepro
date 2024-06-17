import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().optional(),
});

export const UserSearchSchema = z.object({
  type: z.enum(["CONTENT", "CREATIVE"]).optional(),
  other: z.string().optional(),
  jobs: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  data: z.boolean().refine((value) => value === true, {
    message: "You have to select at least one item.",
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: "You have to select at least one item.",
  }),
  onBoard: z.boolean().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
export type UserSearchType = z.infer<typeof UserSearchSchema>;
