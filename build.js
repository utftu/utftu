import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

fs.cpSync(path.join(__dirname, 'types'), path.join(__dirname, 'dist/types'), {
  recursive: true,
});

fs.cpSync(
  path.join(__dirname, '../../static/package-cjs.json'),
  path.join(__dirname, './dist/cjs/package.json'),
  {recursive: true}
);

fs.cpSync(
  path.join(__dirname, '../../static/path.cjs'),
  path.join(__dirname, './dist/cjs/index.js'),
  {recursive: true}
);
esbuild.build({
  entryPoints: [path.join(__dirname, './src/index.js')],
  bundle: true,
  format: 'esm',
  minify: true,
  platform: 'node',
  watch: !!process.env.WATCH,
  outfile: path.join(__dirname, './dist/esm/prod.js'),
});

esbuild.build({
  entryPoints: [path.join(__dirname, './src/index.js')],
  bundle: true,
  format: 'esm',
  minify: false,
  platform: 'node',
  watch: !!process.env.WATCH,
  outfile: path.join(__dirname, './dist/esm/dev.js'),
});

esbuild.build({
  entryPoints: [path.join(__dirname, './src/index.js')],
  bundle: true,
  format: 'cjs',
  minify: true,
  platform: 'node',
  watch: !!process.env.WATCH,
  outfile: path.join(__dirname, './dist/cjs/prod.js'),
});

esbuild.build({
  entryPoints: [path.join(__dirname, './src/index.js')],
  bundle: true,
  format: 'cjs',
  minify: false,
  platform: 'node',
  watch: !!process.env.WATCH,
  outfile: path.join(__dirname, './dist/cjs/dev.js'),
});

export default 'hehe'
