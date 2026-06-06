import { z } from "zod";

// Define your schema
export const Signupschema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(1, "Name must be at least 1 character long"),
  email: z.email(" email is required"),
  password: z
    .string()
    .nonempty("Password is required for sign up.")
    .regex(
      /(?=.*[A-Z])(?=.*[0-9])/,
      "Password must include at least 1 uppercase letter and 1 number",
    )
    .min(8, "Password must be at least 8 characters"),
});

export type SignUpType = z.infer<typeof Signupschema>;
