import { expect, test } from "@playwright/test";
import { loginAsMockedUser } from "./testHelpers";

test.describe("Authenticated User", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsMockedUser(page);
  });

  test("can see dashboard page", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Meal Prep Assistant")).toBeVisible();
  });

  test("can see profile page", async ({ page }) => {
    await page.goto("/profile");

    const allMatches = page.getByText("Profile");

    await expect(allMatches.first()).toBeVisible();
  });
});
