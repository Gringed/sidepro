import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  isEdit: z.boolean().optional(),
  randomUsername: z.string(),
  description: z.string(),
  price: z.string(),
  status: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
