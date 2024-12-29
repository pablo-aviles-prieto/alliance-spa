import { expect, test, type Page } from '@playwright/test';

const GRAPHQL_ENDPOINT = 'https://sandbox-api-test.samyroad.com/graphql';

const mockedImagesObj = [
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
];

const mockGraphqlResponse = (page: Page, nodes: unknown[]) => {
  return page.route(GRAPHQL_ENDPOINT, route => {
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

  test.only('Display image actions on hover', async ({ page }) => {
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
});
