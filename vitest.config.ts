import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

// Vitest config overrides vite config if not merged
// https://vitest.dev/guide/#configuring-vitest
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/tests/unit/**/*.{test,spec}.{ts,tsx}'],
      environment: 'jsdom',
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
      },
      globals: true,
    },
  })
);
