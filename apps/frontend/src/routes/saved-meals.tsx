import { createFileRoute, redirect } from "@tanstack/react-router";

function SavedMealsRoute() {
  return <div>Hello "/saved-meals"!</div>;
}

export const Route = createFileRoute("/saved-meals")({
  component: SavedMealsRoute,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth" });
    }
  },
});
