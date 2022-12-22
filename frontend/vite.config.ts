import react from '@vitejs/plugin-react';
import * as path from 'path';
import { injectHtml, minifyHtml } from 'vite-plugin-html';

import { UserConfig, defineConfig } from 'vite';

// https://vitejs.dev/config/
const resolve = (p: string) => {
  return path.resolve(__dirname, p);
};

export default defineConfig({
  resolve: {
    alias: { '@': resolve('src') },
    extensions: ['.tsx', '.js', '.ts'],
  },
  plugins: [
    react(),
    minifyHtml(),
    injectHtml({
      data: {
        title: 'Quiz',
        injectScript: '',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['**/*.{test,spec,steps}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  },
} as UserConfig);
