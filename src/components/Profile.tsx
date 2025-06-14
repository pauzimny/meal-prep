import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import type { Tables } from "@/lib/supabase";
import { useNavigate } from "@tanstack/react-router";
import { IconButton } from "./ui/icon-button";

export type UserProfile = Tables["users"];

export function Profile() {
  const { signOut, user: authenticatedUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditingDietaryPreferences, setIsEditingDietaryPreferences] =
    useState(false);
  const [newPreference, setNewPreference] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);

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

  useEffect(() => {
    if (user) {
      setDietaryPreferences(user.dietary_preferences);
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate({ to: "/auth" });
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const toggleEditDietaryPreferences = () => {
    setIsEditingDietaryPreferences((prev) => !prev);
  };

  const handleAddPreference = async () => {
    if (!newPreference.trim()) return;
    const updatedPreferences = [...dietaryPreferences, newPreference.trim()];
    setSaving(true);
    const { error } = await supabase
      .from("users")
      .update({ dietary_preferences: updatedPreferences })
      .eq("id", user?.id)
      .select();
    setSaving(false);
    if (!error) {
      setDietaryPreferences(updatedPreferences);
      setUser(
        (prev) => prev && { ...prev, dietary_preferences: updatedPreferences }
      );
      setNewPreference("");
      setShowAddInput(false);
    } else {
      alert("Failed to update dietary preferences");
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

  const isUserDietaryPreferencesEmpty = user.dietary_preferences.length === 0;

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
          <div className="flex items-center justify-between">
            <CardTitle>Dietary Preferences</CardTitle>
            <IconButton
              variant="outline"
              size="icon"
              onClick={toggleEditDietaryPreferences}
            >
              <Pencil />
            </IconButton>
          </div>
        </CardHeader>
        <CardContent>
          {isEditingDietaryPreferences ? (
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {dietaryPreferences.length === 0
                  ? "N/A"
                  : dietaryPreferences.map((preference) => (
                      <span
                        key={preference}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {preference}
                      </span>
                    ))}
              </div>
              {showAddInput ? (
                <div className="flex gap-2 items-center">
                  <input
                    className="border rounded px-2 py-1 text-sm"
                    value={newPreference}
                    onChange={(e) => setNewPreference(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddPreference();
                    }}
                    disabled={saving}
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={handleAddPreference}
                    disabled={saving || !newPreference.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setShowAddInput(false);
                      setNewPreference("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <IconButton
                  variant="outline"
                  size="icon"
                  onClick={() => setShowAddInput(true)}
                  aria-label="Add dietary preference"
                >
                  <Plus />
                </IconButton>
              )}
              <div className="mt-4">
                <Button
                  variant="secondary"
                  onClick={toggleEditDietaryPreferences}
                  disabled={saving}
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {isUserDietaryPreferencesEmpty
                ? "N/A"
                : user.dietary_preferences.map((preference) => (
                    <span
                      key={preference}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {preference}
                    </span>
                  ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
