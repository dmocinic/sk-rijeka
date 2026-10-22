import { json, slugify, toArticle, validate } from "../../../_shared.js";
import { requireAdmin } from "../../../_admin-auth.js";

export async function onRequestGet(context) {
  const denied = await requireAdmin(context, json); if (denied) return denied;
  const result = await context.env.NEWS_DB.prepare("SELECT * FROM news ORDER BY updated_at DESC,id DESC LIMIT 200").all();
  return json({ ok: true, articles: result.results.map(toArticle) });
}

export async function onRequestPost(context) {
  const denied = await requireAdmin(context, json); if (denied) return denied;
  const input = await context.request.json();
  const checked = validate(input); if (checked.error) return json({ ok: false, message: checked.error }, 400);
  const value = checked.value;
  let slug = slugify(input.slug || value.title);
  if (await context.env.NEWS_DB.prepare("SELECT id FROM news WHERE slug=?1").bind(slug).first()) slug += `-${crypto.randomUUID().slice(0,8)}`;
  const row = await context.env.NEWS_DB.prepare("INSERT INTO news(slug,title,summary,body,category,image_path,image_alt,featured,published,published_at,updated_at) VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,CURRENT_TIMESTAMP) RETURNING *").bind(slug,value.title,value.summary,value.body,value.category,value.imagePath,value.alt,value.featured,value.published,value.publishedAt).first();
  return json({ ok: true, article: toArticle(row) }, 201);
}
