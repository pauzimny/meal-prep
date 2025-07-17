import { create } from "zustand";
import { type UserProfileSchema } from "@meal-prep/contracts";

type UserStore = {
  user: UserProfileSchema | null;
  setUser: (user: UserProfileSchema | null) => void;
  clearUser: () => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
  error: string | null;
  setIsError: (error: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  isLoading: false,
  setIsError: (error) => set({ error }),
  error: null,
}));
