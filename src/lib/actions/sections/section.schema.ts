import { z } from "zod";

export const SectionSchema = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().max(1000, "1000 characters max").optional(),
  sideId: z.string(),
  type: z.enum(["TITLE", "TEXT", "LINK", "IMAGE", "ME"]).optional(),
  color: z.string().optional(),
  background: z.string().optional(),
  mobile: z.any().optional(),
  desktop: z.any().optional(),
  i: z.string().optional(),
});

export type SectionType = z.infer<typeof SectionSchema>;
