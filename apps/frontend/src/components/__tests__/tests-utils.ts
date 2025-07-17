import { type UserProfileSchema } from "@meal-prep/contracts";
import { type User } from "@supabase/supabase-js";

export const testUserProfile: UserProfileSchema = {
  name: "Test User",
  email: "test@example.com",
  meal_count: 0,
  favourite_cuisine: "Italian",
  dietary_preferences: ["Vegetarian", "Gluten-Free"],
};

export const testAuthUser: User = {
  id: "123",
  email: "test@example.com",
  aud: "",
  created_at: "10-07-2025",
  app_metadata: {},
  user_metadata: {},
};
