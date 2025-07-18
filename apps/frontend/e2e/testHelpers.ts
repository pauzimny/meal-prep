import { mockedSession, SUPABASE_PROJECT_KEY } from "./mocks/user-session.mock";

export async function loginAsMockedUser(page) {
  const projectKey = `sb-${SUPABASE_PROJECT_KEY}-auth-token`;
  const session = JSON.stringify(mockedSession);

  await page.addInitScript(() => {
    localStorage.setItem(
      `sb-${SUPABASE_PROJECT_KEY}-auth-token`,
      JSON.stringify(mockedSession)
    );
  }, [projectKey, session]);
}
