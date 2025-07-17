import { type UserProfileSchema } from "@meal-prep/contracts";
import { supabase } from "./client";

export const getUserProfile = async (userId: string) => {
  return await supabase.from("users").select("*").eq("id", userId).single();
};

export const addNewUserProfile = async (newUser: UserProfileSchema) => {
  return await supabase.from("users").insert([newUser]);
};

export const updateUserDietaryPreferences = async ({
  userId,
  dietaryPreferences,
}: {
  userId: string;
  dietaryPreferences: string[];
}) => {
  return await supabase
    .from("users")
    .update({ dietary_preferences: dietaryPreferences })
    .eq("id", userId)
    .select();
};
