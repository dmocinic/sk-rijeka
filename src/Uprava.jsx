import React from "react";
import "./uprava.css";

const vodstvo = [
  { funkcija: "Predsjednik", ime: "Dorjan Močinić", slika: "/images/uprava/predsjednik.jpg" },
  { funkcija: "Dopredsjednik", ime: "Josip Šarić", slika: "/images/uprava/dopredsjednik.jpg" },
  { funkcija: "Tajnik", ime: "Velibor Mitrović", slika: "/images/uprava/tajnik.jpg" },
];

const upravniOdbor = [
  { ime: "Dorjan Močinić", uloga: "Predsjednik kluba" },
  { ime: "Josip Šarić", uloga: "Dopredsjednik i član Upravnog odbora" },
  { ime: "Velibor Mitrović", uloga: "Tajnik i član Upravnog odbora" },
  { ime: "Davor Haramija", uloga: "Član Upravnog odbora" },
  { ime: "Paula Močinić", uloga: "Članica Upravnog odbora" },
];

const nadzorniOdbor = ["Hrvoje Šarić", "Luka Kaštelan", "Krešimir Vukić"];
const stegovniSud = ["Dorjan Močinić", "Josip Šarić", "Velibor Mitrović"];

function PopisTijela({ naslov, clanovi }) {
  return <article className="uprava-panel"><h3>{naslov}</h3><ul>{clanovi.map(clan => <li key={clan}>{clan}</li>)}</ul></article>;
}

export default function Uprava() {
  return (
    <main className="uprava-page">
      <header className="uprava-hero"><div className="uprava-container"><h1>Uprava kluba</h1><p className="uprava-lead">Vodstvo Streličarskog kluba Rijeka izabrano je na Redovnoj izbornoj skupštini održanoj 17. srpnja 2023. Predsjednik i Upravni odbor izabrani su na mandat od četiri godine.</p></div></header>

      <section className="uprava-section uprava-container">
        <div className="uprava-heading"><p className="uprava-kicker">VODSTVO KLUBA</p><h2>Predsjednik, dopredsjednik i tajnik</h2></div>
        <div className="uprava-photo-grid">
          {vodstvo.map(osoba => <article className="uprava-photo-card" key={osoba.funkcija}>
            <img src={osoba.slika} alt={`${osoba.funkcija} Streličarskog kluba Rijeka`} />
            <div className="uprava-photo-copy"><span>{osoba.funkcija}</span><strong>{osoba.ime}</strong></div>
          </article>)}
        </div>
      </section>

      <section className="uprava-section uprava-soft"><div className="uprava-container">
        <div className="uprava-heading"><p className="uprava-kicker">UPRAVNI ODBOR</p><h2>Članovi Upravnog odbora</h2></div>
        <div className="uprava-members">{upravniOdbor.map(clan => <article className="uprava-member" key={clan.ime}><div className="uprava-avatar" aria-hidden="true">{clan.ime.split(" ").map(dio => dio[0]).join("")}</div><div><h3>{clan.ime}</h3><p>{clan.uloga}</p></div></article>)}</div>
      </div></section>

      <section className="uprava-section uprava-container">
        <div className="uprava-organ-grid"><PopisTijela naslov="Nadzorni odbor" clanovi={nadzorniOdbor}/><PopisTijela naslov="Stegovni sud" clanovi={stegovniSud}/></div>
        <div className="uprava-role-single"><span>Likvidator</span><strong>Dorjan Močinić</strong></div>
        <aside className="uprava-note">Dopredsjednik, tajnik i likvidator izabrani su na sjednici Upravnog odbora održanoj 18. srpnja 2023.</aside>
      </section>
    </main>
  );
}
