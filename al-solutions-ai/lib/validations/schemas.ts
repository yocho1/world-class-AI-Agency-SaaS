import { z } from "zod";

export const leadCaptureSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  industry: z.string().min(2),
  teamSize: z.string().min(1),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1).max(3000),
  sessionId: z.string().min(8),
});