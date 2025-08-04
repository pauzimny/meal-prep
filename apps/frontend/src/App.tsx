import React from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./stores/authStore";
import { useAuthListener } from "./components/Auth/useAuthListener";

const router = createRouter({
  context: undefined,
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppContent() {
  const isLoading = useAuthStore((state) => state.loading);
  const authUser = useAuthStore((state) => state.user);

  useAuthListener();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} context={{ user: authUser }} />;
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
