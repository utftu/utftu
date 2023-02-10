import esbuild from 'esbuild';
import path from 'node:path';
import fs from 'node:fs';
import {exec} from './utils.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const entries = [
  {name: 'create-lazy-func', external: []},
  {name: 'use-force-update', external: ['react']},
  {name: 'use-store', external: ['react']},
  {name: 'wait-time', external: []},
  {name: 'create-controlled-promise', external: []},
  {name: 'float', external: []},
  {name: 'delayed-calls', external: []},
  {name: 'ee', external: []},
];

// format package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
packageJson.exports = entries.reduce(
  (exports, {name}) => {
    exports[`./${name}.js`] = {
      development: {
        import: `./dist/${name}/esm/dev.js`,
        require: `./dist/${name}/cjs/dev.js`,
      },
      production: {
        import: `./dist/${name}/esm/prod.js`,
        require: `./dist/${name}/cjs/prod.js`,
      },
      import: `./dist/${name}/esm/prod.js`,
      require: `./dist/${name}/cjs/prod.js`,
    };
    return exports;
  },
  {'./*': './*'}
);
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

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

  fs.cpSync(
    path.join(__dirname, '../static/path.cjs'),
    path.join(__dirname, '../dist', name, 'cjs/index.js'),
    {recursive: true}
  );

  // fs.cpSync(
  //   path.join(__dirname, '../src/', name, `${name}.d.ts`),
  //   path.join(__dirname, '..', `${name}.d.ts`),
  //   {recursive: true}
  // );

  const dts = path.join(__dirname, '../src/', name, `${name}.d.ts`);
  const outDts = path.join(__dirname, '..', `${name}.d.ts`);
  if (fs.existsSync(dts)) {
    fs.cpSync(dts, path.join(__dirname, '..', `${name}.d.ts`), {
      recursive: true,
    });
  } else {
    const work = path.join(__dirname, '../src/', name, `${name}.ts`);
    exec(
      `./node_modules/typescript/bin/tsc --outDir . --emitDeclarationOnly --declaration ${work}`
    );
  }

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
