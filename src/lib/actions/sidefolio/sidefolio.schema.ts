import { z } from "zod";

export const SidefolioSchema = z.object({
  slug: z.string().optional(),
  background: z.string().optional(),
  color: z.string().optional(),
  compactType: z.enum(["horizontal", "vertical", "null"]).optional().nullable(),
});

export type SidefolioType = z.infer<typeof SidefolioSchema>;
