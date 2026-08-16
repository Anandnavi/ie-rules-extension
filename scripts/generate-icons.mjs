/**
 * scripts/generate-icons.mjs — Generates the extension PNG icons (16/32/48/128).
 *
 * Pure-Node PNG writer (zlib deflate, no external deps). Draws a navy
 * rounded-corner square with an "IE" checkmark glyph built from pixels.
 *
 * Usage: node scripts/generate-icons.mjs
 */
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(root, '..', 'icons');
mkdirSync(outDir, { recursive: true });

/** Minimal CRC32 (PNG chunk checksums). */
function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, pixelFn) {
  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4); // filter byte + RGBA
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixelFn(x, y, size);
      const o = 1 + x * 4;
      row[o] = r; row[o + 1] = g; row[o + 2] = b; row[o + 3] = a;
    }
    rows.push(row);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(Buffer.concat(rows))),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// Draw: navy background (#1f3a5f), rounded corners, white "IE" text block + teal accent bar.
function pixel(x, y, size) {
  const m = Math.max(1, size / 64); // margins scale with size
  const r = 10 * m;                 // corner radius
  const inside =
    x >= r && x < size - r ? true : y >= r && y < size - r ? true : false;
  if (!inside) return [0, 0, 0, 0]; // rounded corner transparency

  const bg = [31, 58, 95, 255];
  // Text: two vertical bars (I) and a horizontal mid-bar (E) in white.
  const cx = size / 2;
  const bw = 6 * m; // bar width
  const gap = 12 * m;
  const top = 16 * m;
  const bot = size - 16 * m;
  const mid = size / 2;
  if (x >= cx - gap - bw / 2 && x <= cx - gap + bw / 2 && y >= top && y <= bot) return [255, 255, 255, 255];
  if (x >= cx + gap - bw / 2 && x <= cx + gap + bw / 2 && y >= top && y <= bot) return [255, 255, 255, 255];
  if (x >= cx - gap - bw / 2 && x <= cx + gap + bw / 2 && y >= mid - bw / 2 && y <= mid + bw / 2) return [255, 255, 255, 255];
  // Teal accent bar under the glyph.
  if (x >= cx - gap - bw / 2 && x <= cx + gap + bw / 2 && y >= bot - 2 * m && y <= bot) return [0, 188, 212, 255];
  return bg;
}

for (const size of [16, 32, 48, 128]) {
  writeFileSync(resolve(outDir, `icon${size}.png`), encodePng(size, pixel));
  console.log(`✓ icons/icon${size}.png`);
}
