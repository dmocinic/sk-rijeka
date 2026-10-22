import { json } from "../../../_shared.js";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE = 10 * 1024 * 1024;

export async function onRequestPost({ env, request }) {
  if (!env.NEWS_IMAGES) return json({ ok: false, message: "R2 binding NEWS_IMAGES nije konfiguriran." }, 500);
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return json({ ok: false, message: "Fotografija nije odabrana." }, 400);
  if (!ALLOWED.has(file.type)) return json({ ok: false, message: "Dopušteni su JPG, PNG i WEBP formati." }, 400);
  if (file.size > MAX_SIZE) return json({ ok: false, message: "Fotografija smije imati najviše 10 MB." }, 400);

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const key = `${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}.${extension}`;
  await env.NEWS_IMAGES.put(key, file.stream(), {
    httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" },
    customMetadata: { originalName: file.name.slice(0, 200) },
  });

  return json({ ok: true, key, url: `/news-images/${encodeURIComponent(key)}` }, 201);
}
