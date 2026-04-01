import { test, expect } from "@playwright/test";

/**
 * Onboarding E2E tests.
 * These tests assume the app is running and a valid test user session
 * can be established. For CI, you'd inject an auth cookie or use a
 * dedicated test account.
 */

test.describe("Onboarding wizard", () => {
  // Skip if no auth cookie is available (unauthenticated runs)
  test.beforeEach(async ({ page }) => {
    // Check if we're authenticated by visiting /dashboard
    await page.goto("/onboarding");
    if (page.url().includes("/login")) {
      test.skip();
    }
  });

  test("renders template picker step", async ({ page }) => {
    await expect(page.getByText(/choose your team template/i)).toBeVisible();
  });

  test("shows all template options", async ({ page }) => {
    await expect(page.getByText("SaaS Startup")).toBeVisible();
    await expect(page.getByText("Marketing Agency")).toBeVisible();
    await expect(page.getByText("Dev Studio")).toBeVisible();
    await expect(page.getByText("Custom Team")).toBeVisible();
  });

  test("can select a template and advance to step 2", async ({ page }) => {
    await page.getByText("Marketing Agency").click();
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByText(/name your company/i)).toBeVisible();
  });

  test("requires company name before launching", async ({ page }) => {
    await page.getByRole("button", { name: /continue/i }).click();
    const launchButton = page.getByRole("button", { name: /launch team/i });
    await expect(launchButton).toBeDisabled();
  });

  test("shows launch progress after entering company name", async ({ page }) => {
    await page.getByRole("button", { name: /continue/i }).click();
    await page.getByLabel(/company name/i).fill("Test Corp");
    await expect(page.getByRole("button", { name: /launch team/i })).toBeEnabled();
  });

  test("back button returns to template picker", async ({ page }) => {
    await page.getByRole("button", { name: /continue/i }).click();
    await page.getByRole("button", { name: /back/i }).click();
    await expect(page.getByText(/choose your team template/i)).toBeVisible();
  });
});
