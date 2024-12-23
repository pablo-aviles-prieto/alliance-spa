import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SearchContextValue {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const url = new URL(window.location.href);
  const initialSearch = url.searchParams.get('search') || '';
  const [searchWord, setSearchWord] = useState(initialSearch);

  return (
    <SearchContext.Provider value={{ searchWord, setSearchWord }}>
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
