// import {readFileSync, writeFileSync} from 'fs';
// import {build, defineConfig} from 'vite';

// class PackageConfig {
//   constructor({name, external}) {
//     this.name = name;
//     this.external = external;
//   }

//   get dir() {
//     return `./packages/${this.name}`;
//   }

//   get entry() {
//     return `${this.dir}/${this.name}.js`;
//   }
// }

// const packages = [
//   new PackageConfig({
//     name: 'controlled-promise',
//     external: [],
//   }),
//   new PackageConfig({
//     name: 'ee',
//     external: [],
//   }),
//   new PackageConfig({
//     name: 'float',
//     external: [],
//   }),
//   new PackageConfig({
//     name: 'delayed-calls',
//     external: [],
//   }),
//   new PackageConfig({
//     name: 'wait-time',
//     external: [],
//   }),
// ];

// const packageJson = JSON.parse(readFileSync('./package.json').toString());
// packageJson.exports = packages.reduce((store, {dir, name}) => {
//   store[`./${name}`] = {
//     import: `${dir}/dist/${name}.js`,
//     require: `${dir}/dist/${name}.cjs`,
//   };
//   return store;
// }, {});
// writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
// for (const {name, entry, dir, external} of packages) {
//   await build({
//     build: {
//       target: 'esnext',
//       outDir: `${dir}/dist`,
//       name,
//       lib: {
//         fileName: name,
//         entry: [entry],
//         formats: ['es', 'cjs'],
//       },
//       rollupOptions: {
//         external: external,
//       },
//     },
//   });
// }

import {build} from 'vite';
import dts from 'vite-plugin-dts';

await build({
  build: {
    target: 'esnext',
    outDir: `./dist`,
    lib: {
      entry: ['./utftu.ts'],
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [dts()],
});
