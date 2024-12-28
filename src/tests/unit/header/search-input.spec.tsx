import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import { HeaderSearchInput } from '@/features/layout/components/search-input';

describe('Header Search Input', () => {
  test('renders input with correct value', async () => {
    const { getByPlaceholder } = render(
      <HeaderSearchInput value='test search' onChangeHandler={Function} />
    );

    const input = getByPlaceholder("You're looking for something?");
    const inputElement = input.element();
    const value = inputElement.getAttribute('value');

    expect(value).toBe('test search');
  });

  test('calls onChangeHandler when input changes', async () => {
    const mockHandler = vi.fn();
    const { getByPlaceholder } = render(
      <HeaderSearchInput value='test search' onChangeHandler={mockHandler} />
    );

    const input = getByPlaceholder("You're looking for something?");
    await input.fill('new search value');

    expect(mockHandler).toHaveBeenCalledWith('new search value');
  });

  test('pass empty string to the change handler function', async () => {
    const mockHandler = vi.fn();
    const { getByRole } = render(
      <HeaderSearchInput value='test search' onChangeHandler={mockHandler} />
    );

    const clearButton = getByRole('button');
    await clearButton.click();

    expect(mockHandler).toHaveBeenCalledWith('');
  });
});
