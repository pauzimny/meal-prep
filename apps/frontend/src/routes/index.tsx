import { createFileRoute, redirect } from "@tanstack/react-router";
import { MealPrep } from "../components/MealPrep/MealPrep";

function HomeRoute() {
  return <MealPrep />;
}

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth" });
    }
  },
  component: HomeRoute,
});
