import { json, slugify, toPublicArticle, validateArticle } from "../../../_shared.js";

export async function onRequestGet({ env }) {
  if (!env.NEWS_DB) return json({ ok: false, message: "D1 binding NEWS_DB nije konfiguriran." }, 500);
  const result = await env.NEWS_DB.prepare(`SELECT * FROM news ORDER BY updated_at DESC, id DESC LIMIT 200`).all();
  return json({ ok: true, articles: result.results.map(toPublicArticle) });
}

export async function onRequestPost({ env, request }) {
  if (!env.NEWS_DB) return json({ ok: false, message: "D1 binding NEWS_DB nije konfiguriran." }, 500);
  const input = await request.json();
  const checked = validateArticle(input);
  if (checked.error) return json({ ok: false, message: checked.error }, 400);
  const value = checked.value;
  let slug = slugify(input.slug || value.title);
  if (!slug) return json({ ok: false, message: "Nije moguće izraditi URL oznaku vijesti." }, 400);

  const existing = await env.NEWS_DB.prepare(`SELECT id FROM news WHERE slug = ?1`).bind(slug).first();
  if (existing) slug = `${slug}-${crypto.randomUUID().slice(0, 8)}`;

  const result = await env.NEWS_DB.prepare(`
    INSERT INTO news (slug,title,summary,body,category,image_alt,featured,published,published_at,updated_at)
    VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,CURRENT_TIMESTAMP)
    RETURNING *
  `).bind(slug,value.title,value.summary,value.body,value.category,value.imageAlt,value.featured,value.published,value.publishedAt).first();

  return json({ ok: true, article: toPublicArticle(result) }, 201);
}
