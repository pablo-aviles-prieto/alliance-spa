import { useEffect, useState } from 'react';

import { SammyLogo } from '@/assets/sammy-logo';
import { LayoutContentContainer } from '@/components/containers/content-layout';
import { useSearch } from '@/context/search-context';
import { useDebounce } from '@/hooks/use-debounce';

export const LayoutHeader = () => {
  const [searchInput, setSearchInput] = useState('');
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

  useEffect(() => {
    const url = new URL(window.location.href);
    const initialSearch = url.searchParams.get('search') || '';
    setSearchInput(initialSearch);
    setSearchWord(initialSearch);
  }, [setSearchWord]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedUpdate(e.target.value);
  };

  return (
    <header className='bg-primary'>
      <LayoutContentContainer className='flex h-[var(--header-height)] items-center justify-between'>
        <div>
          <SammyLogo />
        </div>
        <div>
          <input
            className='min-h-[30px] min-w-[270px] rounded-[20px] bg-[#F2F2F2] px-6'
            placeholder={`You're looking for something?`}
            value={searchInput}
            onChange={handleChange}
          />
        </div>
      </LayoutContentContainer>
    </header>
  );
};
