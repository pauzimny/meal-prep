import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUserStore } from "../../stores/userStore";
import { type UserProfileSchema } from "@meal-prep/contracts";
import { signIn, signUp } from "../../lib/supabase/auth";
import { addNewUserProfile, getUserProfile } from "../../lib/supabase/user";

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(true);

  const setUserProfile = useUserStore((state) => state.setUser);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data: authData, error: authError } = await signUp({
        email,
        password,
        name,
      });

      if (authError) {
        console.error("Sign up error:", authError);
        throw authError;
      }

      if (authData.user) {
        setIsSignUp(false);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during registration";
      console.error("Registration error:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error } = await signIn({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }

      if (data.user) {
        const user = data.user;

        // check whether the user profile already exists
        // TODO: REFACTOR!
        // It'a adding the user profile logic
        const { error: fetchError, data: userProfile } = await getUserProfile(
          user.id
        );

        if (userProfile) {
          setUserProfile(userProfile);
        }

        if (fetchError && fetchError.code === "PGRST116") {
          const newlyCreatedInitialProfile: UserProfileSchema = {
            id: user.id,
            email: user.email,
            name: user.user_metadata.name ?? "",
            meal_count: 0,
            favourite_cuisine: "",
            dietary_preferences: [],
          };

          const { error: insertError } = await addNewUserProfile(
            newlyCreatedInitialProfile
          );

          if (insertError) {
            console.error("Error profile creation:", insertError);
          } else {
            setUserProfile(newlyCreatedInitialProfile);
            console.log("The new user profile has been created.");
          }
        } else {
          console.log("The user already exists.");
        }

        setMessage("Successfully signed in!");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during sign in";
      console.error("Sign in error:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Meal Prep</CardTitle>
          <CardDescription>
            {isSignUp ? "Create an account" : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
          >
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}
            {message && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-500">
                {message}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setMessage(null);
                }}
                className="w-full"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Need an account? Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
