import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Heading } from "../components/Heading";
import { type AppRouterContext } from "../lib/types";
import { useAuthStore } from "../stores/authStore";
import { NavLink } from "../components/NavLink";

function RootComponent() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="w-full min-h-[100vh] flex flex-col">
      {!!user && (
        <div className="sticky top-0 z-10">
          <Heading />
          <div className="py-4 px-6 flex gap-6 bg-white">
            <NavLink to="/" activeProps={{}} activeOptions={{ exact: true }}>
              Home
            </NavLink>
            <NavLink to="/profile">Profile</NavLink>
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
