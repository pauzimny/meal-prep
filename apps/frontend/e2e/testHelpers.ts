import { mockedSession, SUPABASE_PROJECT_KEY } from "./mocks/user-session.mock";

export async function loginAsMockedUser(page) {
  await page.addInitScript(
    ([key, session]) => {
      localStorage.setItem(key, JSON.stringify(session));
    },
    [`sb-${SUPABASE_PROJECT_KEY}-auth-token`, mockedSession]
  );
}
