#!/usr/bin/env node
/**
 * build-gallery.js
 * Scans assets/gallery for images and generates gallery.json
 *
 * Rules:
 * - Supported: jpg, jpeg, png, webp
 * - Category by filename prefix:
 *   manicure-*, gel-*, ext-*, art-*
 *   ext-* => extensions
 *
 * Usage:
 *   node tools/build-gallery.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const GALLERY_DIR = path.join(ROOT, "assets", "gallery");
const OUT_FILE = path.join(ROOT, "gallery.json");

const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function detectCategory(filename) {
  const name = filename.toLowerCase();
  if (name.startsWith("manicure-")) return "manicure";
  if (name.startsWith("gel-")) return "gel";
  if (name.startsWith("ext-")) return "extensions";
  if (name.startsWith("art-")) return "art";
  // default (if someone forgets prefix)
  return "manicure";
}

function makeAlt(filename) {
  // Convert "gel-rose-03.jpg" -> "gel rose 03"
  const base = filename.replace(/\.[^/.]+$/, "");
  return base.replace(/[-_]+/g, " ").trim();
}

function main() {
  if (!fs.existsSync(GALLERY_DIR)) {
    console.error(`Gallery directory not found: ${GALLERY_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter(d => d.isFile())
    .map(d => d.name)
    .filter(name => exts.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en"));

  const items = files.map((filename) => {
    const category = detectCategory(filename);
    return {
      src: `assets/gallery/${filename}`,
      category,
      alt: makeAlt(filename),
    };
  });

  fs.writeFileSync(OUT_FILE, JSON.stringify(items, null, 2) + "\n", "utf8");
  console.log(`✓ Generated ${path.relative(ROOT, OUT_FILE)} with ${items.length} item(s).`);
  console.log(`✓ Scanned: ${path.relative(ROOT, GALLERY_DIR)}`);
}

main();
