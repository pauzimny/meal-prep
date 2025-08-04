import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { IconButton } from "../ui/icon-button";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import {
  useGetUserProfile,
  useUpdateUserDietaryPreferencesMutation,
} from "../../query-hooks/user/useUserProfile";

export function Profile() {
  const signOut = useAuthStore((state) => state.signOut);

  const userProfile = useUserStore((state) => state.user);
  const userId = useAuthStore((state) => state.user?.id);
  const setUserProfile = useUserStore((state) => state.setUser);

  const [isEditingDietaryPreferences, setIsEditingDietaryPreferences] =
    useState(false);
  const [newPreference, setNewPreference] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);

  const { isLoading, error } = useGetUserProfile(userId);

  const { mutate } = useUpdateUserDietaryPreferencesMutation({
    onSuccess: (_, variables) => {
      setDietaryPreferences(variables.dietaryPreferences);
      setUserProfile({
        ...userProfile!,
        dietary_preferences: variables.dietaryPreferences,
      });
      setNewPreference("");
      setShowAddInput(false);
      setSaving(false);
    },
    onError: (error) => {
      console.error("error:", error.message);
      setSaving(false);
      alert("Failed to update dietary preferences");
    },
  });

  const navigate = useNavigate();

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
    if (!newPreference.trim() || !userProfile) return;
    const updatedPreferences = [...dietaryPreferences, newPreference.trim()];
    setSaving(true);

    mutate({
      dietaryPreferences: updatedPreferences,
      userId: userProfile.id!,
    });
  };

  useEffect(() => {
    if (userProfile) {
      setDietaryPreferences(userProfile.dietary_preferences || []);
    }
  }, [userProfile]);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userProfile) {
    return <div>No profile found</div>;
  }

  const isUserDietaryPreferencesEmpty =
    userProfile && userProfile?.dietary_preferences?.length === 0;

  const initials = userProfile?.name
    ? userProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : undefined;

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
              <AvatarImage
                src={userProfile.avatar_url || undefined}
                alt={userProfile.name}
              />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-sm text-muted-foreground">
                {userProfile.email}
              </p>
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
              <p className="text-2xl font-bold">{userProfile.meal_count}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Favorite Cuisine
              </p>
              <p className="text-2xl font-bold">
                {userProfile.favourite_cuisine}
              </p>
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
                : userProfile?.dietary_preferences?.map((preference) => (
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
