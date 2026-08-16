/**
 * build.mjs — Builds the Epiplex IE Rules Generator extension.
 *
 * - Bundles TypeScript entries with esbuild (zero runtime deps in the bundle).
 * - content.js   : IIFE (content scripts cannot be ES modules).
 * - background.js: ES module (MV3 service worker, "type": "module").
 * - popup.js     : ES module (loaded from popup.html with <script type="module">).
 *
 * Bundles are written to the PROJECT ROOT next to manifest.json / popup.html /
 * styles.css so that "Load unpacked" works on the project folder itself, and a
 * self-contained copy is also placed in dist/. Both locations are loadable.
 *
 * Usage: node build.mjs [--watch]
 */
import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const dist = resolve(root, 'dist');
const watch = process.argv.includes('--watch');

// Generate the extension icons if they do not exist yet (pure-Node PNG writer).
await import('./scripts/generate-icons.mjs');

// Clean output directory (dist copy only — the root bundles are overwritten in place).
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const shared = {
  bundle: true,
  sourcemap: 'inline',
  minify: false,
  target: ['chrome110', 'edge110'],
  logLevel: 'info',
  loader: { '.json': 'json' },
};

// Bundle targets: written to the root (so the project folder itself loads in
// Chrome/Edge) and then copied into dist/ for a clean packaged copy.
const entries = [
  { entryPoints: [resolve(root, 'src/content.ts')], outfile: resolve(root, 'content.js'), format: 'iife' },
  { entryPoints: [resolve(root, 'src/background.ts')], outfile: resolve(root, 'background.js'), format: 'esm' },
  { entryPoints: [resolve(root, 'src/popup.ts')], outfile: resolve(root, 'popup.js'), format: 'esm' },
];

const promises = entries.map((e) =>
  build({
    ...shared,
    ...e,
    ...(watch
      ? { watch: { onRebuild(error) { if (error) console.error('rebuild failed', error); else console.log('rebuilt'); } } }
      : {}),
  })
);

// Static assets.
cpSync(resolve(root, 'popup.html'), resolve(dist, 'popup.html'));
cpSync(resolve(root, 'styles.css'), resolve(dist, 'styles.css'));
cpSync(resolve(root, 'manifest.json'), resolve(dist, 'manifest.json'));
cpSync(resolve(root, 'icons'), resolve(dist, 'icons'), { recursive: true });

await Promise.all(promises);

// Mirror the root bundles into dist/ so it stays a self-contained copy.
for (const f of ['content.js', 'background.js', 'popup.js']) {
  cpSync(resolve(root, f), resolve(dist, f));
}

console.log('✓ Build complete → bundles at project root + dist/');
