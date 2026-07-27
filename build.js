/**
 * Utkal Labs v3 — Static build script
 *
 * Reads page templates from  _src/
 * Injects shared partials from  _partials/
 * Writes final HTML to the project root (same deploy target as before)
 *
 * Usage:  node build.js   or   npm run build
 *
 * Template syntax:  <!-- @@include: partial-name -->
 * Partial files live in _partials/ and are named <partial-name>.html
 *
 * All paths in partials use absolute URLs (/assets/..., /index.html, ...)
 * so the same partial works from both root pages and subdirectory pages.
 *
 * Commit both _src/ and _partials/ (source) AND the generated .html files
 * (output) — deploy the generated files exactly as you do today.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const PARTIALS_DIR  = '_partials';
const TEMPLATES_DIR = '_src';

// ── 1. Load all partials into memory ──────────────────────────────────────────
const partials = {};
for (const fname of fs.readdirSync(PARTIALS_DIR)) {
  if (!fname.endsWith('.html')) continue;
  const name = path.basename(fname, '.html');
  partials[name] = fs.readFileSync(path.join(PARTIALS_DIR, fname), 'utf8');
}

// ── 2. Render a template: replace <!-- @@include: name --> with partial HTML ──
function render(src, srcPath) {
  return src.replace(/<!--\s*@@include:\s*(\S+?)\s*-->/g, (match, name) => {
    if (!(name in partials)) {
      throw new Error(`[build] Unknown partial "${name}" referenced in ${srcPath}`);
    }
    return partials[name];
  });
}

// ── 3. Walk _src/ and build each .html file to the mirrored root path ─────────
let built = 0;

function buildDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const srcPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      buildDir(srcPath);
    } else if (entry.name.endsWith('.html')) {
      const outPath = path.relative(TEMPLATES_DIR, srcPath); // strips "_src/"
      const raw     = fs.readFileSync(srcPath, 'utf8');
      const output  = render(raw, srcPath);

      // Ensure output directory exists (e.g. services/service-fintech-solution/)
      const outDir = path.dirname(outPath);
      if (outDir && outDir !== '.') fs.mkdirSync(outDir, { recursive: true });

      fs.writeFileSync(outPath, output, 'utf8');
      console.log('  built →', outPath);
      built++;
    }
  }
}

console.log('\nBuilding v3 pages...\n');
buildDir(TEMPLATES_DIR);
console.log(`\nDone — ${built} page${built !== 1 ? 's' : ''} built.\n`);
