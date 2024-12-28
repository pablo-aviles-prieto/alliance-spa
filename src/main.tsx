import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import App from '@/App.tsx';
import { SearchProvider } from '@/context/search-context';
import GraphqlRepository from '@/services/graphql-repository';

import '@/index.css';

// TODO: Add unit and e2e tests
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={GraphqlRepository.getQueryClient()}>
      <SearchProvider>
        <App />
      </SearchProvider>
    </QueryClientProvider>
  </StrictMode>
);
