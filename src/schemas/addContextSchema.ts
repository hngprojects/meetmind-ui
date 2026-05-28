import { z } from "zod";

export const addContextSchema = z.object({
  roleTitle: z
    .string()
    .min(2, "Role title must be at least 2 characters")
    .max(100, "Role title must be under 100 characters"),

  jobDescription: z
    .string()
    .min(10, "Job description must be at least 10 characters")
    .max(1000, "Job description must be under 1000 characters"),

  keySkills: z
    .string()
    .min(3, "Please enter at least one skill")
    .max(300, "Key skills must be under 300 characters"),

  customQuestion: z
    .string()
    .max(500, "Custom question must be under 500 characters")
    .optional(),
});

// Inferred TypeScript type from schema
export type AddContextFormData = z.infer<typeof addContextSchema>;
