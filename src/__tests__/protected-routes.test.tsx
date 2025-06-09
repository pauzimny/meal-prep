import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { useNavigate } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "@/lib/auth-context";

// *** Mock the router
vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
}));

//***  Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: null },
        error: null,
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
  },
}));

function TestComponent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate({ to: "/auth" });
    return null;
  }

  return <div>Protected Content</div>;
}

describe("Protected Routes", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate
    );
  });

  it("Redirects to /auth when accessing protected route as anonymous", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/auth" });
    });
  });
});
