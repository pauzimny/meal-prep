import { type UserProfileSchema } from "@meal-prep/contracts";
import { supabase } from "./client";
import { UpdateUserDietaryPreferencesDTO } from "../../query-hooks/user/useUserProfile";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export const getUserProfile = async (userId: string) => {
  return await supabase.from("users").select("*").eq("id", userId).single();
};

export const addNewUserProfile = async (newUser: UserProfileSchema) => {
  return await supabase.from("users").insert([newUser]);
};

export const updateUserDietaryPreferences = async ({
  userId,
  dietaryPreferences,
}: UpdateUserDietaryPreferencesDTO): Promise<
  PostgrestSingleResponse<UpdateUserDietaryPreferencesDTO[]>
> => {
  return await supabase
    .from("users")
    .update({ dietary_preferences: dietaryPreferences })
    .eq("id", userId)
    .select("id, dietary_preferences");
};
