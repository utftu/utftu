// vite.config.ts
import {defineConfig} from 'vitest/config';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [typescript()],
});
