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

function baseName(filename) {
  return path.basename(filename, path.extname(filename));
}

function cleanName(filename) {
  return baseName(filename)
    .replace(/__(wide|portrait|standard)$/i, "")
    .replace(/^\d{4}(?:[-_]\d{2}[-_]\d{2})?[-_]+/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}

function forcedFormat(filename) {
  const match = baseName(filename).match(/__(wide|portrait|standard)$/i);
  return match ? match[1].toLowerCase() : null;
}

function parseDate(filename) {
  const name = baseName(filename);

  // Puni datum: YYYY-MM-DD ili YYYY_MM_DD
  const full = name.match(/^(\d{4})[-_](\d{2})[-_](\d{2})(?:[-_]|$)/);
  if (full) {
    const year = Number(full[1]);
    const month = Number(full[2]);
    const day = Number(full[3]);
    const valid = year >= 1900 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= 31;
    if (valid) {
      return {
        year,
        month,
        day,
        precision: "day",
        sortValue: year * 10000 + month * 100 + day,
        display: `${full[1]}-${full[2]}-${full[3]}`,
      };
    }
  }

  // Samo godina: YYYY-naziv.jpg ili YYYY_naziv.jpg
  const yearOnly = name.match(/^(\d{4})(?:[-_]|$)/);
  if (yearOnly) {
    const year = Number(yearOnly[1]);
    if (year >= 1900 && year <= 2100) {
      return {
        year,
        month: null,
        day: null,
        precision: "year",
        sortValue: year * 10000,
        display: yearOnly[1],
      };
    }
  }

  return {
    year: null,
    month: null,
    day: null,
    precision: "none",
    sortValue: null,
    display: null,
  };
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
  if (buffer.toString("ascii", 12, 16) === "VP8X") {
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

function comparePhotos(a, b) {
  const aHasDate = a.datum.sortValue !== null;
  const bHasDate = b.datum.sortValue !== null;

  // Sve fotografije s datumom ili godinom dolaze prije onih bez datuma.
  if (aHasDate !== bHasDate) return aHasDate ? -1 : 1;

  if (aHasDate && bHasDate) {
    // Najnovija godina/datum ide prva.
    if (a.datum.sortValue !== b.datum.sortValue) return b.datum.sortValue - a.datum.sortValue;

    // Unutar iste godine puni datumi dolaze prije fotografija koje imaju samo godinu.
    if (a.datum.precision !== b.datum.precision) return a.datum.precision === "day" ? -1 : 1;
  }

  // Isti datum, ista godina ili bez datuma: abecedno po naslovu.
  return a.naslov.localeCompare(b.naslov, "hr", { numeric: true, sensitivity: "base" });
}

try {
  await fs.mkdir(ROOT, { recursive: true });
  const files = await walk(ROOT);
  const photos = [];

  for (const file of files) {
    const relative = path.relative(ROOT, file).split(path.sep).join("/");
    const category = relative.split("/")[0];
    const size = await dimensions(file);
    const datum = parseDate(file);
    const naslov = cleanName(file) || datum.display || "Fotografija";

    photos.push({
      src: `/images/galerija/${relative}`,
      kategorija: category,
      kategorijaNaziv: CATEGORY_LABELS[category] || cleanName(category),
      naslov,
      opis: `${CATEGORY_LABELS[category] || cleanName(category)} — ${naslov}.`,
      format: forcedFormat(file) || autoFormat(size),
      datum,
      width: size?.width || null,
      height: size?.height || null,
    });
  }

  photos.sort(comparePhotos);
  await fs.writeFile(OUTPUT, JSON.stringify({ generatedAt: new Date().toISOString(), photos }, null, 2));
  console.log(`Galerija: pronađeno ${photos.length} fotografija. Sortiranje: najnoviji datum/godina, zatim fotografije bez datuma.`);
} catch (error) {
  console.error("Neuspjelo generiranje galerije:", error);
  process.exit(1);
}
