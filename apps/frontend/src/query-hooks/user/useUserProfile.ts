import {
  useMutation,
  type UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserDietaryPreferences,
} from "../../lib/supabase/user";
import { type PostgrestSingleResponse } from "@supabase/supabase-js";

export type UpdateUserDietaryPreferencesDTO = {
  userId: string;
  dietaryPreferences: string[];
};

export const useGetUserProfile = (id: string) => {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: async () => {
      const { data, error } = await getUserProfile(id);

      if (error) throw error;
      return data;
    },
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
