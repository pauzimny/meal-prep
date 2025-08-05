import { type UserProfileSchema } from "@meal-prep/contracts";
import { supabase } from "./client";
import {
  UpdateUserSavedMealsListDTO,
  type UpdateUserDietaryPreferencesDTO,
} from "../../query-hooks/user/useUserProfile";
import { type PostgrestSingleResponse } from "@supabase/supabase-js";

export const getUserProfile = async (
  userId: string
): Promise<PostgrestSingleResponse<UserProfileSchema>> => {
  return await supabase.from("users").select("*").eq("id", userId).single();
};

export const addNewUserProfile = async (newUser: UserProfileSchema) => {
  return await supabase.from("users").insert([newUser]);
};

export const updateUserDietaryPreferences = async ({
  userId,
  dietaryPreferences,
}: UpdateUserDietaryPreferencesDTO): Promise<PostgrestSingleResponse<null>> => {
  return await supabase
    .from("users")
    .update({ dietary_preferences: dietaryPreferences })
    .eq("id", userId);
};

export const updateUserSavedMealsList = async ({
  userId,
  newMeal,
}: UpdateUserSavedMealsListDTO): Promise<PostgrestSingleResponse<null>> => {
  const { data: currentUser } = await supabase
    .from("users")
    .select("saved_meals")
    .eq("id", userId)
    .single();

  const currentSavedMeals = currentUser?.saved_meals || [];
  const updatedSavedMeals = [...currentSavedMeals, newMeal];

  return await supabase
    .from("users")
    .update({ saved_meals: updatedSavedMeals })
    .eq("id", userId);
};
