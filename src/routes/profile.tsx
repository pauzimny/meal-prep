import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="w-[100vw]">Hello "/profile"!</div>;
}
