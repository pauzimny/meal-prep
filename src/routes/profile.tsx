import { Profile } from "@/components/Profile";
import { mockedUser } from "@/mocks/user.mock";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Profile user={mockedUser} />;
}
