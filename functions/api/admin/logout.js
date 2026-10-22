import { json } from "../../_shared.js";
import { clearSessionCookie } from "../../_admin-auth.js";
export async function onRequestPost() {
  const response = json({ ok: true });
  response.headers.append("Set-Cookie", clearSessionCookie());
  return response;
}
