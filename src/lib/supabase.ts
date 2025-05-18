import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Tables = {
  profiles: {
    id: string;
    created_at: string;
    name: string;
    email: string;
    avatar_url: string | null;
    meal_count: number;
    favorite_cuisine: string;
    dietary_preferences: string[];
  };
  meals: {
    id: string;
    created_at: string;
    user_id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    cuisine_type: string;
    prep_time: number;
    cooking_time: number;
    servings: number;
  };
};
