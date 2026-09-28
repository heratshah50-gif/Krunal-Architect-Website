import { z } from "zod";

export const projectTypes = [
  // Service chips on the homepage enquiry form
  "Architecture",
  "Valuation",
  "Advisory",
  "Residential",
  "Commercial",
  "Institutional",
  "Renovation",
  "Valuation Only",
  "Advisory Only",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal("")),
  projectType: z.enum(projectTypes).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please share at least a sentence or two about your project.")
    .max(2000),
  // Honeypot field: real visitors never fill this in.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
