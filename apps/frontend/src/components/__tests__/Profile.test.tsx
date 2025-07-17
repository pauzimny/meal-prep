import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Profile } from "../Profile";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { testAuthUser, testUserProfile } from "./tests-utils";

// *** Mock the router
vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
}));

// *** Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: {
              id: "123",
              name: "Test User",
              email: "test@example.com",
              avatar_url: null,
              meal_count: 5,
              favorite_cuisine: "Italian",
              dietary_preferences: ["Vegetarian", "Gluten-Free"],
            },
            error: null,
          }),
        })),
      })),
    })),
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: { user: { id: "123" } } },
        error: null,
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
  },
}));

describe("Profile", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate
    );

    useAuthStore.setState({ user: testAuthUser });
    useUserStore.setState({ user: testUserProfile });
  });

  it("Renders user profile information", async () => {
    render(<Profile />);

    expect(await screen.findByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
    expect(screen.getByText("Vegetarian")).toBeInTheDocument();
    expect(screen.getByText("Gluten-Free")).toBeInTheDocument();
  });

  it("Shows loading state initially", () => {
    render(<Profile />);

    expect(screen.getByText("Loading profile...")).toBeInTheDocument();
  });
});
