export async function onRequestGet({ env, params, request }) {
  if (!env.NEWS_IMAGES) return new Response("R2 binding NEWS_IMAGES nije konfiguriran.", { status: 500 });
  const key = Array.isArray(params.key) ? params.key.join("/") : params.key;
  const object = await env.NEWS_IMAGES.get(key, { onlyIf: request.headers });
  if (!object) return new Response("Fotografija nije pronađena.", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}
