import { create } from "zustand";
import { type UserProfileSchema } from "@meal-prep/contracts";

type UserStore = {
  user: UserProfileSchema | null;
  setUser: (user: UserProfileSchema | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
