import React from "react";
import "./treninzi.css";

const termini = [
  { dan: "Ponedjeljak", vrijeme: "18:00 – 20:00", kategorija: "Sve kategorije" },
  { dan: "Utorak", vrijeme: "18:00 – 20:00", kategorija: "U11, U13, U15" },
  { dan: "Srijeda", vrijeme: "18:00 – 20:00", kategorija: "Sve kategorije" },
  { dan: "Četvrtak", vrijeme: "18:00 – 20:00", kategorija: "U11, U13, U15" },
  { dan: "Petak", vrijeme: "18:00 – 20:00", kategorija: "Sve kategorije" },
];

const treneri = [
  { ime: "Velibor Mitrović", kategorije: "U15 – seniori", struka: "Trener streličarstva, Magistra", status: "Profesionalni" },
  { ime: "Josip Šarić", kategorije: "U15 – seniori", struka: "VSS, FITA licenca", status: "Volonter" },
  { ime: "Davor Haramija", kategorije: "U11, U13", struka: "Trener streličarstva, Magistra", status: "Volonter" },
];

export default function Treninzi() {
  return <main className="training-page">
    <header className="training-hero"><div className="training-container"><p className="training-kicker">STRELIČARSKI KLUB RIJEKA</p><h1>Treninzi</h1><p>Planirani termini treninga i stručni kadar za program 2027.</p></div></header>
    <section className="training-section training-container"><p className="training-kicker">RASPORED</p><h2>Termini treninga</h2><p className="training-intro">Svi navedeni treninzi održavaju se u dvorani na adresi Ružićeva 7, Rijeka.</p><div className="training-grid">{termini.map(t=><article key={t.dan}><span>{t.dan}</span><strong>{t.vrijeme}</strong><p>{t.kategorija}</p></article>)}</div><aside className="training-note">Za subotu u planskom obrascu nije naveden termin treninga.</aside></section>
    <section className="training-section training-soft"><div className="training-container"><p className="training-kicker">STRUČNI KADAR</p><h2>Treneri</h2><div className="coach-grid">{treneri.map(t=><article key={t.ime}><div className="coach-role">Trener</div><h3>{t.ime}</h3><dl><div><dt>Kategorije</dt><dd>{t.kategorije}</dd></div><div><dt>Stručna sprema</dt><dd>{t.struka}</dd></div><div><dt>Status</dt><dd>{t.status}</dd></div></dl></article>)}</div></div></section>
  </main>;
}
