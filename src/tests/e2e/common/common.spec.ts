import { expect, test } from '@playwright/test';

test.describe('Header end 2 end', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Alliance SPA/);
  });
});
