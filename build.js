import {readFileSync} from 'fs';
import {build, defineConfig} from 'vite';

class PackageConfig {
  constructor({name, external}) {
    this.name = name;
    this.external = external;
  }

  get dir() {
    return `./packages/${this.name}`;
  }

  get entry() {
    return `${this.dir}/${this.name}.js`;
  }
}

const packages = [
  new PackageConfig({
    name: 'create-controlled-promise',
    external: [],
  }),
  new PackageConfig({
    name: 'ee',
    external: [],
  }),
  new PackageConfig({
    name: 'float',
    external: [],
  }),
  new PackageConfig({
    name: 'delayed-calls',
    external: [],
  }),
];

// const packageJson = JSON.stringify(readFileSync('./package.json').toString());
// packageJson.exports = {
//   ...packageJson.exports,
//   ...packages
// };
for (const {name, entry, dir, external} of packages) {
  await build({
    build: {
      target: 'esnext',
      outDir: `${dir}/dist`,
      name,
      lib: {
        fileName: name,
        entry: [entry],
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: external,
      },
    },
  });
}
