export const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  },
});

export const clean = (value, max = 5000) => String(value ?? "").trim().slice(0, max);

export const slugify = (value) => clean(value, 180)
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/đ/g, "d")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 120);

export const toPublicArticle = (row) => ({
  id: row.id,
  slug: row.slug,
  naslov: row.title,
  sazetak: row.summary,
  tekst: JSON.parse(row.body || "[]"),
  kategorija: row.category,
  slika: row.image_key ? `/news-images/${encodeURIComponent(row.image_key)}` : null,
  slikaAlt: row.image_alt || row.title,
  istaknuto: Boolean(row.featured),
  objavljeno: Boolean(row.published),
  datum: row.published_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export function validateArticle(input) {
  const title = clean(input.naslov, 180);
  const summary = clean(input.sazetak, 500);
  const category = clean(input.kategorija || "Klupske aktivnosti", 80);
  const imageAlt = clean(input.slikaAlt, 220);
  const paragraphs = Array.isArray(input.tekst)
    ? input.tekst.map((p) => clean(p, 4000)).filter(Boolean)
    : clean(input.tekst, 12000).split(/\n\s*\n/).map((p) => clean(p, 4000)).filter(Boolean);
  const published = input.objavljeno === true || input.objavljeno === "true" || input.objavljeno === 1;
  const featured = input.istaknuto === true || input.istaknuto === "true" || input.istaknuto === 1;
  const date = clean(input.datum, 25);

  if (!title) return { error: "Naslov je obavezan." };
  if (!summary) return { error: "Sažetak je obavezan." };
  if (!paragraphs.length) return { error: "Tekst mora sadržavati barem jedan odlomak." };
  if (published && !date) return { error: "Objavljena vijest mora imati datum objave." };
  if (date && Number.isNaN(Date.parse(date))) return { error: "Datum objave nije valjan." };

  return {
    value: {
      title,
      summary,
      body: JSON.stringify(paragraphs),
      category,
      imageAlt,
      published: published ? 1 : 0,
      featured: featured ? 1 : 0,
      publishedAt: date ? new Date(date).toISOString() : null,
    },
  };
}
