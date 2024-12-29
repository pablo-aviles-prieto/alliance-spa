import { expect, test, type Page } from '@playwright/test';

const mockGraphqlResponse = (page: Page, nodes: unknown[]) => {
  return page.route('https://sandbox-api-test.samyroad.com/graphql', route => {
    const mockResponse = {
      data: {
        images: {
          nodes,
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
          },
        },
      },
    };

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });
};

test.describe('Landing end 2 end', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Alliance SPA/);
  });

  test('Render 3 grid items', async ({ page }) => {
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
        id: '2',
        title: 'Mock 2',
        picture: 'https://loremflickr.com/300/300',
        author: 'Degas',
        likesCount: 188,
        liked: true,
        createdAt: '2024-12-10T17:22:57Z',
        updatedAt: '2024-12-28T00:21:09Z',
      },
      {
        id: '3',
        title: 'Mock 3',
        picture: 'https://loremflickr.com/300/300',
        author: 'Diego Rivera',
        likesCount: 330,
        liked: false,
        createdAt: '2024-12-10T17:22:57Z',
        updatedAt: '2024-12-29T15:48:32Z',
        price: 25.34,
      },
    ]);
    const imagesCard = page.getByTestId('image-card');
    await expect(imagesCard).toHaveCount(3);
  });

  test('No items to display message', async ({ page }) => {
    await mockGraphqlResponse(page, []);
    const imagesCard = page.getByTestId('image-card');

    await expect(imagesCard).toHaveCount(0);
    await expect(page.getByText('No items to display', { exact: true })).toBeVisible();
  });
});
