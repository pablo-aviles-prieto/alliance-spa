import { expect, test } from '@playwright/test';

import { GRAPHQL_ENDPOINT, mockedImagesObj } from '@/tests/e2e/utils/const';
import { mockGraphqlResponse } from '@/tests/e2e/utils/mock-graphql-response';

test.describe('Header end 2 end', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Modifies search query params based on input value', async ({ page }) => {
    await mockGraphqlResponse(page, mockedImagesObj);
    await page.goto('/');
    const imagesCard = page.getByTestId('image-card');
    await expect(imagesCard).toHaveCount(3);

    await mockGraphqlResponse(page, []);
    const inputElement = page.locator('input[type="text"]');
    await inputElement.fill('some search query');
    await page.waitForRequest(GRAPHQL_ENDPOINT);
    await expect(imagesCard).toBeHidden();

    const url = page.url();
    expect(url).toContain('search=some+search+query'); // Check if URL contains the expected query parameter
    const urlSearchParams = new URL(url).searchParams;
    expect(urlSearchParams.get('search')).toBe('some search query');

    await expect(
      page.getByText(`No results found for "some search query"`, { exact: true })
    ).toBeVisible();
  });
});
