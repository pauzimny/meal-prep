import { z } from "zod";
import { recipeResponseSchema } from "../recipe/recipe-answer.schema.type.js";

// TODO: REPLACE WITH AUTO-GENERATED FROM SUPABASE
export const userProfileSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  name: z.string(),
  email: z.string(),
  avatar_url: z.string().nullable(),
  meal_count: z.number(),
  favourite_cuisine: z.string(),
  dietary_preferences: z.array(z.string()),
  saved_meals: z.array(recipeResponseSchema),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;

export const isValidProfile = (data: unknown) =>
  userProfileSchema.safeParse(data);
