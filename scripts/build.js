import esbuild from 'esbuild';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const entries = [
  {name: 'create-lazy-func', external: []},
  {name: 'use-force-update', external: ['react']},
  {name: 'use-store', external: ['react']},
  {name: 'wait-time', external: []},
  {name: 'create-controlled-promise', external: []},
  {name: 'float', external: []},
  {name: 'delayed-calls', external: []},
];

for (const {name, external} of entries) {
  fs.cpSync(
    path.join(__dirname, '../static/package-cjs.json'),
    path.join(__dirname, '../dist', name, 'cjs/package.json'),
    {recursive: true}
  );
  fs.cpSync(
    path.join(__dirname, '../static/path.cjs'),
    path.join(__dirname, '../dist', name, 'cjs/index.js'),
    {recursive: true}
  );

  esbuild.build({
    entryPoints: [path.join(__dirname, '../src', name)],
    bundle: true,
    format: 'esm',
    external,
    minify: true,
    platform: 'node',
    outfile: path.join(__dirname, '../dist', name, 'esm/prod.js'),
  });
  esbuild.build({
    entryPoints: [path.join(__dirname, '../src', name)],
    bundle: true,
    format: 'esm',
    minify: false,
    external,
    platform: 'node',
    outfile: path.join(__dirname, '../dist', name, 'esm/dev.js'),
  });
  esbuild.build({
    entryPoints: [path.join(__dirname, '../src', name)],
    bundle: true,
    format: 'cjs',
    external,
    minify: true,
    platform: 'node',
    outfile: path.join(__dirname, '../dist', name, 'cjs/prod.js'),
  });
  esbuild.build({
    entryPoints: [path.join(__dirname, '../src', name)],
    bundle: true,
    format: 'cjs',
    external,
    minify: false,
    platform: 'node',
    outfile: path.join(__dirname, '../dist', name, 'cjs/dev.js'),
  });
}
