import { createFileRoute, redirect } from "@tanstack/react-router";
import { Profile } from "../components/Profile/Profile";

function ProfileRoute() {
  return <Profile />;
}

export const Route = createFileRoute("/profile")({
  component: ProfileRoute,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth" });
    }
  },
});
