import { Heading } from "@/components/Heading";
import type { AppRouterContext } from "@/lib/types";
import {
  Outlet,
  createRootRouteWithContext,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

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

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <div>404 Not Found</div>,
});
