import Joi from "joi";

export const registerSchema = Joi.object({
  eventId: Joi.string(),
  credentials: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.date().required(),
    hearAboutUs: Joi.string().valid("friends", "other", "social", "myself"),
  }),
});
