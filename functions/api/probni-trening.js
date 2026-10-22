const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
});
const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const escapeHtml = (value) => clean(value, 2000)
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

async function verifyTurnstile({ token, secret, ip }) {
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip) formData.append("remoteip", ip);
  formData.append("idempotency_key", crypto.randomUUID());

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Turnstile Siteverify nije dostupan.");
  return response.json();
}

export async function onRequestPost(context) {
  try {
    if (!(context.request.headers.get("content-type") || "").includes("application/json")) {
      return json({ ok: false, message: "Neispravan format zahtjeva." }, 415);
    }

    const body = await context.request.json();
    if (body.web) return json({ ok: true });

    const ime = clean(body.ime, 120);
    const godina = clean(body.godina, 4);
    const email = clean(body.email, 160);
    const telefon = clean(body.telefon, 50);
    const iskustvo = clean(body.iskustvo, 10);
    const poruka = clean(body.poruka, 1500);
    const turnstileToken = clean(body.turnstileToken, 2048);

    if (!ime || !godina || !email || body.privola !== true) {
      return json({ ok: false, message: "Ispunite obavezna polja i označite privolu." }, 400);
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return json({ ok: false, message: "Unesite ispravnu e-mail adresu." }, 400);
    }
    const year = Number(godina);
    const currentYear = new Date().getUTCFullYear();
    if (!Number.isInteger(year) || year < 1900 || year > currentYear) {
      return json({ ok: false, message: "Unesite ispravnu godinu rođenja." }, 400);
    }
    if (!turnstileToken) {
      return json({ ok: false, message: "Nedostaje sigurnosna provjera. Osvježite stranicu i pokušajte ponovno." }, 400);
    }
    if (!context.env.TURNSTILE_SECRET_KEY || !context.env.RESEND_API_KEY) {
      return json({ ok: false, message: "Slanje prijave nije konfigurirano." }, 500);
    }

    const verification = await verifyTurnstile({
      token: turnstileToken,
      secret: context.env.TURNSTILE_SECRET_KEY,
      ip: context.request.headers.get("CF-Connecting-IP"),
    });

    if (!verification.success || verification.action !== "probni_trening") {
      console.warn("Turnstile verification failed", verification["error-codes"] || [], verification.action);
      return json({ ok: false, message: "Sigurnosna provjera nije uspjela. Pokušajte ponovno." }, 403);
    }

    const html = `<h2>Nova prijava za probni trening</h2>
      <p><strong>Ime i prezime:</strong> ${escapeHtml(ime)}</p>
      <p><strong>Godina rođenja:</strong> ${escapeHtml(godina)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(telefon || "Nije navedeno")}</p>
      <p><strong>Prethodno iskustvo:</strong> ${escapeHtml(iskustvo)}</p>
      <p><strong>Poruka:</strong></p><p>${escapeHtml(poruka || "Nema dodatne poruke").replaceAll("\n", "<br>")}</p>
      <hr><p>Privola: DA</p><p>Turnstile provjera: uspješna</p>`;

    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${context.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "SK Rijeka web <prijave@sk-rijeka.hr>",
        to: ["strelicarski.klub.rijeka@gmail.com"],
        reply_to: email,
        subject: `Prijava za probni trening - ${ime}`,
        html,
      }),
    });

    if (!resend.ok) {
      console.error("Resend error", resend.status, await resend.text());
      return json({ ok: false, message: "Prijavu trenutačno nije moguće poslati. Pokušajte ponovno." }, 502);
    }

    return json({ ok: true, message: "Hvala na prijavi. Klub će vam se javiti s informacijama o probnom treningu." });
  } catch (error) {
    console.error(error);
    return json({ ok: false, message: "Dogodila se pogreška pri slanju prijave." }, 500);
  }
}
