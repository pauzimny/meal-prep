export const mockedSession = {
  access_token: "mock-token",
  refresh_token: "mock-refresh",
  token_type: "bearer",
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  user: {
    id: "123",
    email: "test@example.com",
    role: "authenticated",
    aud: "authenticated",
    confirmation_sent_at: "2025-05-19T13:00:51.169972Z",
    confirmed_at: "2025-05-19T13:01:18.807457Z",
    created_at: "2025-05-19T12:55:23.174411Z",
    email_confirmed_at: "2025-05-19T13:01:18.807457Z",
    is_anonymous: false,
    app_metadata: {},
    identieties: [],
    user_metadata: {},
  },
};

export const SUPABASE_PROJECT_KEY = "yzujvreopfclfynykrex";
