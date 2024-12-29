import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import { render, RenderResult } from 'vitest-browser-react';

import { HeaderSearchInput } from '@/features/layout/components/search-input';

interface SearchInputTest {
  renderSearchInput: RenderResult;
  mockFn: Mock;
}

describe('Header Search Input', () => {
  const mockFn = vi.fn();
  beforeEach<SearchInputTest>(async context => {
    context.renderSearchInput = render(
      <HeaderSearchInput value='test search' onChangeHandler={mockFn} />
    );
    context.mockFn = mockFn;
  });

  test<SearchInputTest>('renders input with correct value', async ({ renderSearchInput }) => {
    const { getByPlaceholder } = renderSearchInput;

    const input = getByPlaceholder("You're looking for something?");
    const inputElement = input.element();
    const value = inputElement.getAttribute('value');

    expect(value).toBe('test search');
  });

  test<SearchInputTest>('calls onChangeHandler when input changes', async ({
    renderSearchInput,
    mockFn,
  }) => {
    const { getByPlaceholder } = renderSearchInput;

    const input = getByPlaceholder("You're looking for something?");
    await input.fill('new search value');

    expect(mockFn).toHaveBeenCalledWith('new search value');
  });

  test<SearchInputTest>('pass empty string to the change handler function', async ({
    renderSearchInput,
    mockFn,
  }) => {
    const { getByRole } = renderSearchInput;

    const clearButton = getByRole('button');
    await clearButton.click();

    expect(mockFn).toHaveBeenCalledWith('');
  });
});
