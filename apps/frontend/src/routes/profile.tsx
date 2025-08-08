import { createFileRoute, redirect } from "@tanstack/react-router";
import { Profile } from "../components/Profile/Profile";

function ProfileRoute() {
  return <Profile />;
}

export const Route = createFileRoute("/profile")({
  component: ProfileRoute,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      return redirect({ to: "/auth" });
    }
  },
});
