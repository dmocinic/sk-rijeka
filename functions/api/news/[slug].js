import { json, toPublicArticle } from "../../_shared.js";

export async function onRequestGet({ env, params }) {
  if (!env.NEWS_DB) return json({ ok: false, message: "D1 binding NEWS_DB nije konfiguriran." }, 500);
  const row = await env.NEWS_DB.prepare(`SELECT * FROM news WHERE slug = ?1 AND published = 1 LIMIT 1`).bind(params.slug).first();
  if (!row) return json({ ok: false, message: "Vijest nije pronađena." }, 404);
  return json({ ok: true, article: toPublicArticle(row) });
}
