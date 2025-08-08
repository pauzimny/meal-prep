import { type RecipeResponseSchema } from "@meal-prep/contracts";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tables = {
  users: {
    id: string;
    created_at: string;
    name: string;
    email: string;
    avatar_url: string | null;
    meal_count: number;
    favorite_cuisine: string;
    dietary_preferences: string[];
    saved_meals: RecipeResponseSchema;
  };
};
