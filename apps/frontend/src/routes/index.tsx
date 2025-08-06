import { createFileRoute, redirect } from "@tanstack/react-router";
import { MealPrep } from "../components/MealPrep/MealPrep";

function HomeRoute() {
  return <MealPrep />;
}

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      return redirect({ to: "/auth" });
    }
  },
  component: HomeRoute,
});
