import { useState } from 'react';

import { SearchIcon } from '@/assets/icons/search';
import { SammyLogo } from '@/assets/sammy-logo';
import { LayoutContentContainer } from '@/components/containers/content-layout';
import { useSearch } from '@/context/search-context';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedUpdate(e.target.value);
  };

  return (
    <header className='bg-primary'>
      <LayoutContentContainer className='flex h-[var(--header-height)] flex-col items-start justify-between py-6 sm:flex-row sm:items-center'>
        <div>
          <SammyLogo />
        </div>
        <div className='mx-auto flex min-h-[30px] min-w-[270px] items-center justify-center gap-x-1 rounded-[20px] bg-[#F2F2F2] px-2 sm:mx-0'>
          <SearchIcon />
          <input
            className='min-w-[220px] bg-inherit focus:outline-none'
            placeholder={`You're looking for something?`}
            value={searchInput}
            onChange={handleChange}
          />
        </div>
      </LayoutContentContainer>
    </header>
  );
};
