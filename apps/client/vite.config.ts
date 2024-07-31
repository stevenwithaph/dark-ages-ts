import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { comlink } from 'vite-plugin-comlink';

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['buffer'],
    }),
    svelte(),
    comlink(),
  ],
  worker: {
    plugins: () => [comlink()],
  },
  cacheDir: '../../node_modules',
  build: {
    target: 'ES2022',
  },
});
