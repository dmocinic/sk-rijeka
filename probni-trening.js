const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  },
});

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const escapeHtml = (value) => clean(value, 2000)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

export async function onRequestPost(context) {
  try {
    const contentType = context.request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return json({ ok: false, message: "Neispravan format zahtjeva." }, 415);

    const body = await context.request.json();
    if (body.web) return json({ ok: true }); // skriveno honeypot polje

    const ime = clean(body.ime, 120);
    const godina = clean(body.godina, 4);
    const email = clean(body.email, 160);
    const telefon = clean(body.telefon, 50);
    const iskustvo = clean(body.iskustvo, 10);
    const poruka = clean(body.poruka, 1500);
    const privola = body.privola === true;

    if (!ime || !godina || !email || !privola) return json({ ok: false, message: "Ispunite obavezna polja i označite privolu." }, 400);
    if (!/^\S+@\S+\.\S+$/.test(email)) return json({ ok: false, message: "Unesite ispravnu e-mail adresu." }, 400);
    const currentYear = new Date().getUTCFullYear();
    const birthYear = Number(godina);
    if (!Number.isInteger(birthYear) || birthYear < 1900 || birthYear > currentYear) return json({ ok: false, message: "Unesite ispravnu godinu rođenja." }, 400);
    if (!context.env.RESEND_API_KEY) return json({ ok: false, message: "Slanje e-maila nije konfigurirano." }, 500);

    const html = `
      <h2>Nova prijava za probni trening</h2>
      <p><strong>Ime i prezime:</strong> ${escapeHtml(ime)}</p>
      <p><strong>Godina rođenja:</strong> ${escapeHtml(godina)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(telefon || "Nije navedeno")}</p>
      <p><strong>Prethodno iskustvo:</strong> ${escapeHtml(iskustvo)}</p>
      <p><strong>Poruka:</strong></p>
      <p>${escapeHtml(poruka || "Nema dodatne poruke").replaceAll("\n", "<br>")}</p>
      <hr>
      <p>Privola za korištenje podataka radi odgovora na upit: DA</p>`;

    const text = `Nova prijava za probni trening\n\nIme i prezime: ${ime}\nGodina rođenja: ${godina}\nE-mail: ${email}\nTelefon: ${telefon || "Nije navedeno"}\nPrethodno iskustvo: ${iskustvo}\n\nPoruka:\n${poruka || "Nema dodatne poruke"}\n\nPrivola: DA`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SK Rijeka web <prijave@sk-rijeka.hr>",
        to: ["strelicarski.klub.rijeka@gmail.com"],
        reply_to: email,
        subject: `Prijava za probni trening - ${ime}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Resend error", response.status, await response.text());
      return json({ ok: false, message: "Prijavu trenutačno nije moguće poslati. Pokušajte ponovno ili se javite klubu e-mailom." }, 502);
    }

    return json({ ok: true, message: "Hvala na prijavi. Klub će vam se javiti s informacijama o probnom treningu." });
  } catch (error) {
    console.error(error);
    return json({ ok: false, message: "Dogodila se pogreška pri slanju prijave." }, 500);
  }
}

export function onRequestGet() {
  return json({ ok: false, message: "Method not allowed" }, 405);
}
