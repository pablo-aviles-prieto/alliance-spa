import { expect, test } from '@playwright/test';

import { mockedImagesObj } from '@/tests/e2e/utils/const';
import { mockGraphqlResponse } from '@/tests/e2e/utils/mock-graphql-response';

test.describe('Landing end 2 end', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Render 3 grid items', async ({ page }) => {
    await mockGraphqlResponse(page, mockedImagesObj);
    const imagesCard = page.getByTestId('image-card');
    await expect(imagesCard).toHaveCount(3);
  });

  test('No items to display message', async ({ page }) => {
    await mockGraphqlResponse(page, []);
    const imagesCard = page.getByTestId('image-card');

    await expect(imagesCard).toHaveCount(0);
    await expect(page.getByText('No items to display', { exact: true })).toBeVisible();
  });

  test('Display image actions on hover', async ({ page }) => {
    await mockGraphqlResponse(page, [
      {
        id: '1',
        title: 'Mock 1',
        picture: 'https://loremflickr.com/300/300',
        author: 'Seurat',
        likesCount: 35,
        liked: true,
        createdAt: '2024-12-10T17:22:57Z',
        updatedAt: '2024-12-28T16:02:17Z',
      },
    ]);

    const imageActions = page.getByTestId('image-actions');
    await expect(imageActions).toBeHidden();
    await page.getByTestId('image-card').hover();
    await expect(imageActions).toBeVisible();
  });

  test('Display price badge when price exists', async ({ page }) => {
    await mockGraphqlResponse(page, [
      {
        id: '1',
        title: 'Mock 1',
        picture: 'https://loremflickr.com/300/300',
        author: 'Seurat',
        likesCount: 35,
        liked: true,
        createdAt: '2024-12-10T17:22:57Z',
        updatedAt: '2024-12-28T16:02:17Z',
      },
      {
        id: '1',
        title: 'Mock 2',
        picture: 'https://loremflickr.com/300/300',
        author: 'Seurat',
        likesCount: 35,
        liked: true,
        createdAt: '2024-12-10T17:22:57Z',
        updatedAt: '2024-12-28T16:02:17Z',
        price: 44.23,
      },
    ]);

    const priceBadge = page.getByTestId('price-badge');
    await expect(priceBadge).toHaveCount(1);
  });
});
