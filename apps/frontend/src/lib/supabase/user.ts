import { type UserProfileSchema } from "@meal-prep/contracts";
import { supabase } from "./client";
import {
  type UpdateUserSavedMealsListDTO,
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
  mealData,
}: UpdateUserSavedMealsListDTO): Promise<PostgrestSingleResponse<null>> => {
  const { data: userSavedMealsObject } = await supabase
    .from("users")
    .select("saved_meals")
    .eq("id", userId)
    .single<{ saved_meals: string[] | null }>();

  const currentSavedMeals = userSavedMealsObject?.saved_meals || [];

  let updatedSavedMeals: string[];
  if (currentSavedMeals.includes(mealData.id)) {
    updatedSavedMeals = currentSavedMeals.filter(
      (meal) => meal !== mealData.id
    );
  } else {
    updatedSavedMeals = [...currentSavedMeals, mealData.id];
  }

  return await supabase
    .from("users")
    .update({ saved_meals: updatedSavedMeals })
    .eq("id", userId);
};
