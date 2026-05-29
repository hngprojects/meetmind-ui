import { z } from "zod";

export const configureAISchema = z.object({
  ai_tone: z.enum(["professional", "friendly", "casual"], {
    message: "Please select an AI tone",
  }),

  participation_mode: z.enum(["passive", "standard", "proactive"], {
    message: "Please select a response detail level",
  }),

  platform: z.enum(["google_meet", "zoom", "livekit"], {
    message: "Please select a platform",
  }),

  call_link: z.string().trim().nonempty("Meeting link is required"),

  scheduled_start: z.string().trim().nonempty("Start time is required"),

  scheduled_end: z.string().trim().nonempty("End time is required"),
});

export type ConfigureAIFormData = z.infer<typeof configureAISchema>;
