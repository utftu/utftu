import {build} from 'vite';
import dts from 'vite-plugin-dts';

await build({
  build: {
    target: 'esnext',
    outDir: `./dist`,
    lib: {
      entry: ['./utftu.ts'],
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [
    dts({
      outDir: './dist/types',
    }),
  ],
});
