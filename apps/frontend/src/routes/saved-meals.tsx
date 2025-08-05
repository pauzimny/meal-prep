import { createFileRoute, redirect } from "@tanstack/react-router";
import { SavedMeals } from "../components/SavedMeals/SavedMeals";

export const Route = createFileRoute("/saved-meals")({
  component: SavedMeals,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth" });
    }
  },
});
