import { build } from 'esbuild';
await build({
  entryPoints: ['src/cli.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/cli.js',
  banner: { js: '#!/usr/bin/env node' },
  external: [],
});
console.log('Built dist/cli.js');
