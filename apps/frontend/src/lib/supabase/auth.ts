import { supabase } from "./client";

type BaseCredentials = {
  password: string;
  email: string;
};

type SignupCredentials = {
  name: string;
} & BaseCredentials;

export const signUp = async (credentials: SignupCredentials) => {
  const { email, password, name } = credentials;

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
};

export const signIn = async (credentials: BaseCredentials) => {
  const { email, password } = credentials;

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};
