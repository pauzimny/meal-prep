import { Link } from "@tanstack/react-router";
import { useUserStore } from "../../stores/userStore";
import { MealSuggestionResult } from "../MealSuggestionResult/MealSuggestionResult";

export function SavedMeals() {
  const userProfile = useUserStore((state) => state.user);

  const mealsList = userProfile?.saved_meals;

  if (!mealsList || mealsList.length === 0) {
    return (
      <div className="w-full text-center">
        No meals saved yet! Go to <Link to="/">meal prep</Link> and find your
        new recipes!
      </div>
    );
  }

  return (
    <ul>
      {mealsList?.map((meal) => (
        <MealSuggestionResult {...meal} />
      ))}
    </ul>
  );
}
