import { Profile } from "@/components/Profile";
import { createFileRoute, redirect } from "@tanstack/react-router";

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
