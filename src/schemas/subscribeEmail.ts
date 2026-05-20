import { z } from "zod";

// Define your schema
export const subscribeEmailschema = z.object({
  email: z.email("email is required"),
});

export type subscribeEmailType = z.infer<typeof subscribeEmailschema>;
