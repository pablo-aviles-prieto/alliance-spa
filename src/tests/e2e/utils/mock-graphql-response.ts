import { Page } from '@playwright/test';

import { GRAPHQL_ENDPOINT } from '@/tests/e2e/utils/const';

export const mockGraphqlResponse = (page: Page, nodes: unknown[]) => {
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
