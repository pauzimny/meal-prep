import { Heading } from "@/components/Heading";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col">
      <Heading />
      <div className="py-4 px-6 flex gap-6">
        <Link to="/" activeProps={{}} activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="grow p-6 w-[100vw]">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}
