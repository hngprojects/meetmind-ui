import { z } from "zod";

export const inputSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Name is required")
    .max(100, "Name must be under 100 characters"),

  email: z.email("Please enter a valid email address").trim(),
  phone: z
    .string()
    .trim()
    .nonempty("Phone number is required")
    .regex(
      /^\+?234[789][01]\d{8}$/,
      "Please enter a valid Nigerian phone number",
    ),
  roleTitle: z
    .string()
    .trim()
    .nonempty("Job role is required")
    .min(2, "Role title must be at least 2 characters")
    .max(100, "Role title must be under 100 characters"),

  yearsofExperience: z
    .number()
    .nonnegative("Experience must be a positive number"),

  keySkills: z
    .string()
    .trim()
    .nonempty("Key skills are required")
    .min(3, "Please enter at least one skill")
    .max(300, "Key skills must be under 300 characters"),

  location: z
    .string()
    .trim()
    .nonempty("Location is required")
    .max(100, "Location must be under 100 characters"),

  portfolioLink: z
    .url("Please enter a valid URL")
    .trim()
    .nonempty("Portfolio link is required")
    .max(200, "Portfolio link must be under 200 characters"),
});

export type InputValuesType = z.infer<typeof inputSchema>;
