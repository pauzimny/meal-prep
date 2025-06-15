import type { User } from "@supabase/supabase-js";

export interface AppRouterContext {
  user?: User | null;
  dietaryPreferences?: string[];
}
