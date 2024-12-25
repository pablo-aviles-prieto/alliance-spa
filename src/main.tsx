import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import App from '@/App.tsx';
import { SearchProvider } from '@/context/search-context';

import '@/index.css';

const queryClient = new QueryClient();

// TODO: Make scrollbar thin
// TODO: Add unit and e2e tests
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <App />
      </SearchProvider>
    </QueryClientProvider>
  </StrictMode>
);
