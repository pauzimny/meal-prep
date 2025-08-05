import {
  useMutation,
  type UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserDietaryPreferences,
  updateUserSavedMealsList,
} from "../../lib/supabase/user";
import { type PostgrestSingleResponse } from "@supabase/supabase-js";
import {
  type RecipeResponseSchema,
  type UserProfileSchema,
} from "@meal-prep/contracts";
import { useUserStore } from "../../stores/userStore";

export type UpdateUserDietaryPreferencesDTO = {
  userId: string;
  dietaryPreferences: string[];
};

export type UpdateUserSavedMealsListDTO = {
  userId: string;
  newMeal: RecipeResponseSchema;
};

export const useGetUserProfile = (id: string | undefined) => {
  const setUser = useUserStore((state) => state.setUser);

  return useQuery<UserProfileSchema>({
    queryKey: ["user-profile", id],
    queryFn: async (): Promise<UserProfileSchema> => {
      const { data, error } = await getUserProfile(id!);

      if (error) throw error;
      if (data) {
        setUser(data);
      }
      return data;
    },
    enabled: !!id,
  });
};

export const useUpdateUserDietaryPreferencesMutation = ({
  onSuccess,
  onError,
}: UseMutationOptions<
  PostgrestSingleResponse<null>,
  Error,
  UpdateUserDietaryPreferencesDTO
>) =>
  useMutation<
    PostgrestSingleResponse<null>,
    Error,
    UpdateUserDietaryPreferencesDTO
  >({
    mutationFn: (data) => updateUserDietaryPreferences(data),
    onSuccess,
    onError,
  });

export const useUpdateUserSavedMealsListMutation = ({
  onSuccess,
  onError,
}: UseMutationOptions<
  PostgrestSingleResponse<null>,
  Error,
  UpdateUserSavedMealsListDTO
>) =>
  useMutation<
    PostgrestSingleResponse<null>,
    Error,
    UpdateUserSavedMealsListDTO
  >({
    mutationFn: (data) => updateUserSavedMealsList(data),
    onSuccess,
    onError,
  });
