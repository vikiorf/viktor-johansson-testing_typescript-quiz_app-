import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { injectHtml, minifyHtml } from 'vite-plugin-html';
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
});
