import { useState } from 'react';

import { SammyLogo } from '@/assets/sammy-logo';
import { LayoutContentContainer } from '@/components/containers/content-layout';
import { useSearch } from '@/context/search-context';
import { HeaderSearchInput } from '@/features/layout/components/search-input';
import { useDebounce } from '@/hooks/use-debounce';

export const LayoutHeader = () => {
  const url = new URL(window.location.href);
  const initialSearch = url.searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(initialSearch);
  const { setSearchWord } = useSearch();

  const debounceCallback = (value: string) => {
    setSearchWord(value);
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set('search', value);
    } else {
      url.searchParams.delete('search');
    }
    window.history.replaceState(null, '', url.toString());
  };
  const debouncedUpdate = useDebounce(debounceCallback);

  const handleChange = (value: string) => {
    setSearchInput(value);
    debouncedUpdate(value);
  };

  return (
    <LayoutContentContainer className='flex h-[var(--header-height)] flex-col items-start justify-between bg-primary py-6 sm:flex-row sm:items-center'>
      <SammyLogo />
      <HeaderSearchInput value={searchInput} onChangeHandler={handleChange} />
    </LayoutContentContainer>
  );
};
