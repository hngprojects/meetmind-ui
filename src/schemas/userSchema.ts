import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  work_email: z.email(),
  password_hash: z.string(),
  avatar_url: z.string(),
  job_title: z.string(),
  role: z.string(),
});

export type User = z.infer<typeof userSchema>;
