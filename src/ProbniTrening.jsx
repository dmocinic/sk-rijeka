import React, { useState } from "react";
import "./probni-trening.css";

const initial = { ime: "", godina: "", email: "", telefon: "", iskustvo: "Ne", poruka: "", privola: false, web: "" };

export default function ProbniTrening() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch("/api/probni-trening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Slanje nije uspjelo.");
      setStatus({ type: "success", message: result.message });
      setForm(initial);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Dogodila se pogreška pri slanju." });
    } finally {
      setSending(false);
    }
  };

  return <main className="trial-page">
    <header className="trial-hero"><div className="trial-container"><p className="trial-kicker">PRVI KORAK</p><h1>Prijavi se za probni trening</h1><p>Ispuni obrazac. Web-stranica će poslati prijavu izravno Streličarskom klubu Rijeka.</p></div></header>
    <section className="trial-section trial-container"><div className="trial-layout">
      <div><p className="trial-kicker">PROBNI TRENING</p><h2>Upoznaj streličarstvo</h2><p>Treninzi se održavaju u dvorani na adresi Ružićeva 7, Rijeka. Za mlađe kategorije U11, U13 i U15 planirani su termini utorkom i četvrtkom od 18:00 do 20:00, a treninzi za sve kategorije ponedjeljkom, srijedom i petkom u istom terminu.</p><div className="trial-contact"><strong>Kontakt kluba</strong><a href="mailto:strelicarski.klub.rijeka@gmail.com">strelicarski.klub.rijeka@gmail.com</a><a href="tel:+385977733189">097 773 3189</a><a href="tel:+38598442264">098 442 264</a></div></div>
      <form className="trial-form" onSubmit={submit}>
        <label>Ime i prezime<input required name="ime" value={form.ime} onChange={update} autoComplete="name" maxLength="120" /></label>
        <div className="trial-form-grid"><label>Godina rođenja<input required name="godina" type="number" min="1900" max={new Date().getFullYear()} value={form.godina} onChange={update} /></label><label>E-mail<input required name="email" type="email" value={form.email} onChange={update} autoComplete="email" maxLength="160" /></label></div>
        <div className="trial-form-grid"><label>Telefon<input name="telefon" type="tel" value={form.telefon} onChange={update} autoComplete="tel" maxLength="50" /></label><label>Prethodno iskustvo<select name="iskustvo" value={form.iskustvo} onChange={update}><option>Ne</option><option>Da</option></select></label></div>
        <label>Poruka / napomena<textarea name="poruka" value={form.poruka} onChange={update} rows="5" maxLength="1500" /></label>
        <label className="trial-web" aria-hidden="true">Web<input name="web" tabIndex="-1" autoComplete="off" value={form.web} onChange={update} /></label>
        <label className="trial-consent"><input required name="privola" type="checkbox" checked={form.privola} onChange={update} /><span>Suglasan/na sam da se navedeni podaci koriste radi odgovora na moj upit o probnom treningu i članstvu.</span></label>
        <button type="submit" disabled={sending}>{sending ? "Slanje…" : "Pošalji prijavu"}</button>
        {status.message && <p className={`trial-status ${status.type}`} role="status">{status.message}</p>}
        <p className="trial-form-note">Podaci se šalju klubu e-mailom i ne spremaju se u bazu ove web-stranice.</p>
      </form>
    </div></section>
  </main>;
}
