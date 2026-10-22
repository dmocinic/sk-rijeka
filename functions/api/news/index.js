import { json, toPublicArticle } from "../../_shared.js";

export async function onRequestGet({ env, request }) {
  if (!env.NEWS_DB) return json({ ok: false, message: "D1 binding NEWS_DB nije konfiguriran." }, 500);
  const url = new URL(request.url);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 50, 1), 100);
  const category = url.searchParams.get("category")?.trim();

  const query = category
    ? env.NEWS_DB.prepare(`SELECT * FROM news WHERE published = 1 AND category = ?1 ORDER BY published_at DESC, id DESC LIMIT ?2`).bind(category, limit)
    : env.NEWS_DB.prepare(`SELECT * FROM news WHERE published = 1 ORDER BY published_at DESC, id DESC LIMIT ?1`).bind(limit);

  const result = await query.all();
  return json({ ok: true, articles: result.results.map(toPublicArticle) });
}
