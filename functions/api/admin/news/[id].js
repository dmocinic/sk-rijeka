import { json, slugify, toArticle, validate } from "../../../_shared.js";
import { requireAdmin } from "../../../_admin-auth.js";

export async function onRequestPut(context) {
  const denied = await requireAdmin(context, json); if (denied) return denied;
  const input = await context.request.json();
  const checked = validate(input); if (checked.error) return json({ ok: false, message: checked.error }, 400);
  const value = checked.value;
  try {
    const row = await context.env.NEWS_DB.prepare("UPDATE news SET slug=?1,title=?2,summary=?3,body=?4,category=?5,image_path=?6,image_alt=?7,featured=?8,published=?9,published_at=?10,updated_at=CURRENT_TIMESTAMP WHERE id=?11 RETURNING *").bind(slugify(input.slug || value.title),value.title,value.summary,value.body,value.category,value.imagePath,value.alt,value.featured,value.published,value.publishedAt,Number(context.params.id)).first();
    return row ? json({ ok: true, article: toArticle(row) }) : json({ ok: false, message: "Vijest nije pronađena." }, 404);
  } catch { return json({ ok: false, message: "URL oznaka vijesti već postoji." }, 409); }
}

export async function onRequestDelete(context) {
  const denied = await requireAdmin(context, json); if (denied) return denied;
  const row = await context.env.NEWS_DB.prepare("DELETE FROM news WHERE id=?1 RETURNING id").bind(Number(context.params.id)).first();
  return row ? json({ ok: true }) : json({ ok: false, message: "Vijest nije pronađena." }, 404);
}
