import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("public/images/galerija");
const OUTPUT = path.resolve("public/gallery-manifest.json");
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const CATEGORY_LABELS = {
  povijest: "Povijest kluba",
  treninzi: "Treninzi",
  natjecanja: "Natjecanja",
  dogadanja: "Klupska događanja",
};

async function walk(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) files.push(...await walk(full));
    else if (ALLOWED.has(path.extname(item.name).toLowerCase())) files.push(full);
  }
  return files;
}

function cleanName(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/__(wide|portrait|standard)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}

function forcedFormat(filename) {
  const match = path.basename(filename, path.extname(filename)).match(/__(wide|portrait|standard)$/i);
  return match ? match[1].toLowerCase() : null;
}

function readPngSize(buffer) {
  if (buffer.length >= 24 && buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
}

function readGifSize(buffer) {
  if (buffer.length >= 10 && ["GIF87a", "GIF89a"].includes(buffer.toString("ascii", 0, 6))) {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
}

function readJpegSize(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    if (!length || length < 2) break;
    offset += 2 + length;
  }
}

function readWebpSize(buffer) {
  if (buffer.length < 30 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return;
  const type = buffer.toString("ascii", 12, 16);
  if (type === "VP8X") {
    return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  }
}

async function dimensions(file) {
  const buffer = await fs.readFile(file);
  return readPngSize(buffer) || readGifSize(buffer) || readJpegSize(buffer) || readWebpSize(buffer) || null;
}

function autoFormat(size) {
  if (!size?.width || !size?.height) return "standard";
  const ratio = size.width / size.height;
  if (ratio >= 1.45) return "wide";
  if (ratio <= 0.8) return "portrait";
  return "standard";
}

try {
  await fs.mkdir(ROOT, { recursive: true });
  const files = await walk(ROOT);
  const photos = [];

  for (const file of files) {
    const relative = path.relative(ROOT, file).split(path.sep).join("/");
    const category = relative.split("/")[0];
    const size = await dimensions(file);
    photos.push({
      src: `/images/galerija/${relative}`,
      kategorija: category,
      kategorijaNaziv: CATEGORY_LABELS[category] || cleanName(category),
      naslov: cleanName(file),
      opis: `${CATEGORY_LABELS[category] || cleanName(category)} — ${cleanName(file)}.`,
      format: forcedFormat(file) || autoFormat(size),
      width: size?.width || null,
      height: size?.height || null,
    });
  }

  photos.sort((a, b) => a.kategorija.localeCompare(b.kategorija, "hr") || a.naslov.localeCompare(b.naslov, "hr"));
  await fs.writeFile(OUTPUT, JSON.stringify({ generatedAt: new Date().toISOString(), photos }, null, 2));
  console.log(`Galerija: pronađeno ${photos.length} fotografija. Manifest: ${OUTPUT}`);
} catch (error) {
  console.error("Neuspjelo generiranje galerije:", error);
  process.exit(1);
}
