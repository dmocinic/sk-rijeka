import React, { useEffect, useRef, useState } from "react";
import "./probni-trening.css";

const TURNSTILE_SITE_KEY = "0x4AAAAAAFgYW5NH5srscdF3";
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const initial = {
  ime: "",
  godina: "",
  email: "",
  telefon: "",
  iskustvo: "Ne",
  poruka: "",
  privola: false,
  web: "",
};

function loadTurnstile() {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const existing = document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.turnstile), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function ProbniTrening() {
  const [form, setForm] = useState(initial);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const widgetContainer = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    let active = true;
    loadTurnstile()
      .then((turnstile) => {
        if (!active || !widgetContainer.current || widgetId.current !== null) return;
        widgetId.current = turnstile.render(widgetContainer.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action: "probni_trening",
          theme: "auto",
          size: "flexible",
          callback: (value) => {
            setToken(value);
            setStatus({ type: "", message: "" });
          },
          "expired-callback": () => setToken(""),
          "error-callback": () => {
            setToken("");
            setStatus({ type: "error", message: "Sigurnosna provjera nije uspjela. Osvježite stranicu i pokušajte ponovno." });
          },
        });
      })
      .catch(() => setStatus({ type: "error", message: "Sigurnosnu provjeru nije moguće učitati." }));

    return () => {
      active = false;
      if (window.turnstile && widgetId.current !== null) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  const update = (event) => setForm({
    ...form,
    [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
  });

  const resetTurnstile = () => {
    setToken("");
    if (window.turnstile && widgetId.current !== null) window.turnstile.reset(widgetId.current);
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    if (!token) {
      setStatus({ type: "error", message: "Dovršite sigurnosnu provjeru prije slanja prijave." });
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/probni-trening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken: token }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Slanje nije uspjelo.");
      setStatus({ type: "success", message: result.message });
      setForm(initial);
      resetTurnstile();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Dogodila se pogreška pri slanju." });
      resetTurnstile();
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="trial-page">
      <header className="trial-hero">
        <div className="trial-container">
          <p className="trial-kicker">PRVI KORAK</p>
          <h1>Prijavi se za probni trening</h1>
          <p>Ispuni obrazac. Web-stranica će poslati prijavu izravno Streličarskom klubu Rijeka.</p>
        </div>
      </header>

      <section className="trial-section trial-container">
        <div className="trial-layout">
          <div>
            <p className="trial-kicker">PROBNI TRENING</p>
            <h2>Upoznaj streličarstvo</h2>
            <p>Treninzi se održavaju u dvorani na adresi Ružićeva 7, Rijeka.</p>
          </div>

          <form className="trial-form" onSubmit={submit}>
            <label>Ime i prezime<input required name="ime" value={form.ime} onChange={update} maxLength="120" autoComplete="name" /></label>
            <div className="trial-form-grid">
              <label>Godina rođenja<input required name="godina" type="number" min="1900" max={new Date().getFullYear()} value={form.godina} onChange={update} /></label>
              <label>E-mail<input required name="email" type="email" value={form.email} onChange={update} maxLength="160" autoComplete="email" /></label>
            </div>
            <div className="trial-form-grid">
              <label>Telefon<input name="telefon" type="tel" value={form.telefon} onChange={update} maxLength="50" autoComplete="tel" /></label>
              <label>Prethodno iskustvo<select name="iskustvo" value={form.iskustvo} onChange={update}><option>Ne</option><option>Da</option></select></label>
            </div>
            <label>Poruka / napomena<textarea name="poruka" value={form.poruka} onChange={update} rows="5" maxLength="1500" /></label>
            <label className="trial-web" aria-hidden="true">Web<input name="web" tabIndex="-1" autoComplete="off" value={form.web} onChange={update} /></label>
            <label className="trial-consent"><input required name="privola" type="checkbox" checked={form.privola} onChange={update} /><span>Suglasan/na sam da se podaci koriste radi odgovora na upit, u skladu s <a href="#/privatnost">Politikom privatnosti</a>.</span></label>

            <div className="trial-turnstile" ref={widgetContainer} aria-label="Sigurnosna provjera" />

            <button type="submit" disabled={sending || !token}>{sending ? "Slanje…" : "Pošalji prijavu"}</button>
            {status.message && <p className={`trial-status ${status.type}`} role="status">{status.message}</p>}
            <p className="trial-form-note">Obrazac je zaštićen Cloudflare Turnstile provjerom. Podaci se šalju klubu e-mailom i ne spremaju se u zasebnu bazu ove web-stranice.</p>
          </form>
        </div>
      </section>
    </main>
  );
}
