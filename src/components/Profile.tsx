import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

import type { Tables } from "@/lib/supabase";
import { useNavigate } from "@tanstack/react-router";

export type UserProfile = Tables["users"];

export function Profile() {
  const { signOut, user: authenticatedUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", authenticatedUser?.id)
          .single();

        if (error) throw error;
        if (mounted) {
          setUser(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [authenticatedUser?.id]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate({ to: "/auth" });
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No profile found</div>;
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Profile</CardTitle>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar_url || undefined} alt={user.name} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meal Prep Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Meals
              </p>
              <p className="text-2xl font-bold">{user.meal_count}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Favorite Cuisine
              </p>
              <p className="text-2xl font-bold">{user.favorite_cuisine}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dietary Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {user.dietary_preferences.map((preference) => (
              <span
                key={preference}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                {preference}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
