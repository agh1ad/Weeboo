import { z } from "zod";

const optionalText = (maximum) =>
  z
    .string()
    .trim()
    .max(maximum)
    .optional()
    .transform((value) => value || "");

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .optional()
  .transform((value) => value || "")
  .refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Enter a complete website address beginning with http:// or https://.");

export const projectRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  client_type: z.string().trim().min(2).max(120),
  service: z.string().trim().min(2).max(120),
  project_idea: z.string().trim().min(10).max(6000),
  current_website: optionalUrl,
  timing: optionalText(120),
  materials: optionalText(160),
  additional_details: optionalText(4000),
  consent: z.literal("yes"),
  company_fax: optionalText(200),
  form_started_at: z.coerce.number().int().positive(),
});

export function parseProjectRequest(payload) {
  return projectRequestSchema.safeParse(payload);
}
