import { create } from "zustand";
import { type User } from "@supabase/supabase-js";
import { redirect } from "@tanstack/react-router";
import { signOut } from "../lib/supabase/auth";

type AuthStore = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  signOut: async () => {
    const { error } = await signOut();
    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    set({ user: null });
    redirect({ to: "/auth" });
  },
}));
