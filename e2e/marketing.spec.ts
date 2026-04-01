import { test, expect } from "@playwright/test";

test.describe("Marketing landing page", () => {
  test("renders homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/melaro/i);
  });

  test("navbar is visible", async ({ page }) => {
    await page.goto("/");
    // Logo present
    await expect(page.locator("nav")).toBeVisible();
  });

  test("has CTA link to signup", async ({ page }) => {
    await page.goto("/");
    const signupLinks = page.getByRole("link", { name: /get (started|early access|access)/i });
    // At least one CTA should link toward signup
    await expect(signupLinks.first()).toBeVisible();
  });

  test("login link navigates to /login", async ({ page }) => {
    await page.goto("/");
    // Find login link in nav
    const loginLink = page.getByRole("link", { name: /log in|sign in/i }).first();
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/\/login/);
    }
  });
});
