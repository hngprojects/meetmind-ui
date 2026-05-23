import { z } from "zod";

const candidateFileSchema = z
  .instanceof(File, { message: "Please upload your file" })
  .refine(
    (file) => {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      return validTypes.includes(file.type);
    },
    { message: "Unsupported format" },
  )
  .refine((file) => file.size <= 100 * 1024 * 1024, {
    message: "File is too large -- max 100MB",
  });

export const CandidateSchema = z.object({
  CandidateUpload: candidateFileSchema.nullable(),
});

export type UploadCandidateValues = z.infer<typeof CandidateSchema>;
