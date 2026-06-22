import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  company: z.string().min(2, "Nom d'entreprise trop court"),
  countryCode: z.string().min(1, "Code pays requis"),
  phone: z.string().regex(/^[0-9]{6,15}$/, "Numéro invalide (6-15 chiffres)"),
  email: z.string().email("Format d'email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;