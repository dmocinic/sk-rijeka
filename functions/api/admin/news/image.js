import { json } from "../../../_shared.js";

export async function onRequestPut({ env, request }) {
  if (!env.NEWS_DB) return json({ ok: false, message: "D1 binding NEWS_DB nije konfiguriran." }, 500);
  const { id, imageKey } = await request.json();
  const result = await env.NEWS_DB.prepare(`UPDATE news SET image_key=?1,updated_at=CURRENT_TIMESTAMP WHERE id=?2 RETURNING id`).bind(imageKey || null, Number(id)).first();
  if (!result) return json({ ok: false, message: "Vijest nije pronađena." }, 404);
  return json({ ok: true });
}
