import { test, expect } from "@playwright/test";

test("Sign in/ log in page loads and shows title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Welcome to Meal Prep")).toBeVisible();
});
