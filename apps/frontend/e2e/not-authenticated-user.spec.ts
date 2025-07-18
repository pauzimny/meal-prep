import { test, expect } from "@playwright/test";

test.describe("Not authenticated user", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("is redirected to auth page", async ({ page }) => {
    await expect(page).toHaveURL(/\/auth/);
  });
});
