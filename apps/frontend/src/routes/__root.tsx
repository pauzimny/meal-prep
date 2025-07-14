import {
  Outlet,
  createRootRouteWithContext,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAuth } from "../lib/auth-context";
import { Heading } from "../components/Heading";
import { type AppRouterContext } from "../lib/types";

function RootComponent() {
  const { user } = useAuth();
  return (
    <div className="w-full min-h-[100vh] flex flex-col">
      {!!user && (
        <div className="sticky top-0 z-10">
          <Heading />
          <div className="py-4 px-6 flex gap-6 bg-white">
            <Link to="/" activeProps={{}} activeOptions={{ exact: true }}>
              Home
            </Link>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      )}
      <div className="grow p-6 w-[100vw]">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <div>404 Not Found</div>,
});
