import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import { SearchProvider } from '@/context/search-context';
import { LayoutHeader } from '@/features/layout/components/header';
import * as getUrlModule from '@/utils/get-current-url';

vi.mock('@/utils/get-current-url', () => ({
  getCurrentUrl: vi.fn(),
}));

describe('Layout Header', () => {
  beforeEach(() => {
    vi.mocked(getUrlModule.getCurrentUrl).mockReturnValue(
      new URL('http://localhost:3000/?search=initial')
    );

    return () => vi.resetAllMocks();
  });

  test('loads initial search value from URL', () => {
    const { getByRole } = render(
      <SearchProvider>
        <LayoutHeader />
      </SearchProvider>
    );

    const input = getByRole('textbox');
    const inputElement = input.element();
    const value = inputElement.getAttribute('value');
    expect(value).toBe('initial');
  });
});
