import { z } from "zod";

const isBrowserFile = (file: unknown): file is File =>
  typeof File !== "undefined" && file instanceof File;

const candidateFileSchema = z
  .custom<File>(isBrowserFile, { message: "Please upload your file" })
  .refine(
    (file) => {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      return isBrowserFile(file) && validTypes.includes(file.type);
    },
    { message: "Unsupported format" },
  )
  .refine((file) => isBrowserFile(file) && file.size <= 10 * 1024 * 1024, {
    message: "File is too large -- max 10MB",
  });

export const CandidateSchema = z.object({
  CandidateUpload: candidateFileSchema,
});

export type UploadCandidateValues = z.infer<typeof CandidateSchema>;
