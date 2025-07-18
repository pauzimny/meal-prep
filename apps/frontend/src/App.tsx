import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./stores/authStore";
import { useAuthListener } from "./components/Auth/useAuthListener";
import { useCallback, useEffect } from "react";
import { getUserProfile } from "./lib/supabase/user";
import { useUserStore } from "./stores/userStore";

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
  const setUserProfile = useUserStore((state) => state.setUser);
  const setError = useUserStore((state) => state.setIsError);
  const setIsLoading = useUserStore((state) => state.setIsLoading);

  useAuthListener();

  const initUserProfile = useCallback(
    async (userId: string) => {
      try {
        const { data, error } = await getUserProfile(userId);

        if (error) throw error;

        setUserProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading, setUserProfile]
  );

  useEffect(() => {
    if (authUser) {
      initUserProfile(authUser.id);
    }
  }, [authUser, initUserProfile]);

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
