import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { comlink } from 'vite-plugin-comlink';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['buffer'],
    }),
    svelte(),
    comlink(),
    tsconfigPaths(),
  ],
  worker: {
    plugins: () => [comlink()],
  },
  cacheDir: '../../node_modules',
  build: {
    target: 'ES2022',
  },
  base: './',
});
