import { json, slugify, toPublicArticle, validateArticle } from "../../../_shared.js";

export async function onRequestPut({ env, request, params }) {
  if (!env.NEWS_DB) return json({ ok: false, message: "D1 binding NEWS_DB nije konfiguriran." }, 500);
  const input = await request.json();
  const checked = validateArticle(input);
  if (checked.error) return json({ ok: false, message: checked.error }, 400);
  const value = checked.value;
  const slug = slugify(input.slug || value.title);

  const result = await env.NEWS_DB.prepare(`
    UPDATE news SET slug=?1,title=?2,summary=?3,body=?4,category=?5,image_alt=?6,featured=?7,published=?8,published_at=?9,updated_at=CURRENT_TIMESTAMP
    WHERE id=?10 RETURNING *
  `).bind(slug,value.title,value.summary,value.body,value.category,value.imageAlt,value.featured,value.published,value.publishedAt,Number(params.id)).first();

  if (!result) return json({ ok: false, message: "Vijest nije pronađena." }, 404);
  return json({ ok: true, article: toPublicArticle(result) });
}

export async function onRequestDelete({ env, params }) {
  if (!env.NEWS_DB) return json({ ok: false, message: "D1 binding NEWS_DB nije konfiguriran." }, 500);
  const row = await env.NEWS_DB.prepare(`SELECT image_key FROM news WHERE id=?1`).bind(Number(params.id)).first();
  if (!row) return json({ ok: false, message: "Vijest nije pronađena." }, 404);
  if (row.image_key && env.NEWS_IMAGES) await env.NEWS_IMAGES.delete(row.image_key);
  await env.NEWS_DB.prepare(`DELETE FROM news WHERE id=?1`).bind(Number(params.id)).run();
  return json({ ok: true });
}
