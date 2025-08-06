import { Page } from "@playwright/test";
import { mockedSession, SUPABASE_PROJECT_KEY } from "./mocks/user-session.mock";

export async function loginAsMockedUser(page: Page) {
  await page.addInitScript(
    ([key, session]) => {
      localStorage.setItem(key as string, JSON.stringify(session));
    },
    [`sb-${SUPABASE_PROJECT_KEY}-auth-token`, mockedSession]
  );
}
