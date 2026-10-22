import { json } from "../../_shared.js";
import { createSessionCookie, hashIp, secureTextEqual } from "../../_admin-auth.js";

async function verifyTurnstile(token, secret, ip) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  body.append("idempotency_key", crypto.randomUUID());
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!response.ok) return { success: false, "error-codes": ["siteverify-unavailable"] };
  return response.json();
}

export async function onRequestPost(context) {
  const { env, request } = context;
  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET || !env.TURNSTILE_SECRET_KEY || !env.NEWS_DB) {
    return json({ ok: false, message: "Administratorska autentikacija nije potpuno konfigurirana." }, 500);
  }

  let input;
  try { input = await request.json(); }
  catch { return json({ ok: false, message: "Neispravan format zahtjeva." }, 400); }

  const password = String(input.password || "");
  const token = String(input.turnstileToken || "");
  if (!password || !token) return json({ ok: false, message: "Unesite lozinku i dovršite sigurnosnu provjeru." }, 400);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ipHash = await hashIp(ip, env.ADMIN_SESSION_SECRET);
  const recent = await env.NEWS_DB.prepare(
    "SELECT COUNT(*) AS count FROM admin_login_attempts WHERE ip_hash=?1 AND success=0 AND attempted_at >= datetime('now','-15 minutes')"
  ).bind(ipHash).first();

  if (Number(recent?.count || 0) >= 5) {
    return json({ ok: false, message: "Previše neuspješnih pokušaja. Pokušajte ponovno kasnije." }, 429);
  }

  const verification = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip);
  if (!verification.success || verification.action !== "admin_login") {
    return json({ ok: false, message: "Sigurnosna provjera nije uspjela. Pokušajte ponovno." }, 403);
  }

  const passwordOk = await secureTextEqual(password, env.ADMIN_PASSWORD);
  await env.NEWS_DB.prepare(
    "INSERT INTO admin_login_attempts (ip_hash,success) VALUES (?1,?2)"
  ).bind(ipHash, passwordOk ? 1 : 0).run();
  await env.NEWS_DB.prepare("DELETE FROM admin_login_attempts WHERE attempted_at < datetime('now','-2 days')").run();

  if (!passwordOk) return json({ ok: false, message: "Neispravna administratorska lozinka." }, 401);

  const response = json({ ok: true, message: "Prijava je uspješna." });
  response.headers.append("Set-Cookie", await createSessionCookie(env.ADMIN_SESSION_SECRET));
  return response;
}
