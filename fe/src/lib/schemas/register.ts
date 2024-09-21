import { z } from "zod";

const isAdult = (dateOfBirth: Date) => {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  return age > 18 || (age === 18 && monthDiff >= 0);
};

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .regex(/^[a-zA-Z\s]+$/, "Full name must only contain letters and spaces"),

  email: z.string().email("Invalid email format"),

  dateOfBirth: z.coerce.date().refine((date) => isAdult(date), {
    message: "You must be at least 18 years old",
  }),

  hearAboutUs: z.enum(["friends", "social", "myself", "other"]).optional(),
});
