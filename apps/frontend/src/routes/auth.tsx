import { createFileRoute } from "@tanstack/react-router";
import { Auth } from "@/components/Auth";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

function AuthRoute() {
  const { user } = useAuth();
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
