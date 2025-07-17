import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Auth } from "../components/Auth/Auth";
import { useAuthStore } from "../stores/authStore";

function AuthRoute() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  return <Auth />;
}

export const Route = createFileRoute("/auth")({
  component: AuthRoute,
});
