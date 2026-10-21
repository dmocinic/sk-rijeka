import React from "react";
import "./uprava.css";

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
  return (
    <article className="uprava-panel">
      <h3>{naslov}</h3>
      <ul>
        {clanovi.map((clan) => <li key={clan}>{clan}</li>)}
      </ul>
    </article>
  );
}

export default function Uprava() {
  return (
    <main className="uprava-page">
      <header className="uprava-hero">
        <div className="uprava-container">
          <p className="uprava-kicker">STRELIČARSKI KLUB RIJEKA</p>
          <h1>Uprava kluba</h1>
          <p className="uprava-lead">
            Vodstvo Streličarskog kluba Rijeka izabrano je na Redovnoj izbornoj
            skupštini održanoj 17. srpnja 2023. Predsjednik i Upravni odbor
            izabrani su na mandat od četiri godine.
          </p>
        </div>
      </header>

      <section className="uprava-section uprava-container">
        <div className="uprava-heading">
          <p className="uprava-kicker">VODSTVO KLUBA</p>
          <h2>Odgovorne osobe</h2>
        </div>

        <div className="uprava-role-grid">
          <article className="uprava-role uprava-role-primary">
            <span>Predsjednik</span>
            <strong>Dorjan Močinić</strong>
          </article>
          <article className="uprava-role">
            <span>Dopredsjednik</span>
            <strong>Josip Šarić</strong>
          </article>
          <article className="uprava-role">
            <span>Tajnik</span>
            <strong>Velibor Mitrović</strong>
          </article>
          <article className="uprava-role">
            <span>Likvidator</span>
            <strong>Dorjan Močinić</strong>
          </article>
        </div>
      </section>

      <section className="uprava-section uprava-soft">
        <div className="uprava-container">
          <div className="uprava-heading">
            <p className="uprava-kicker">UPRAVNI ODBOR</p>
            <h2>Članovi Upravnog odbora</h2>
          </div>

          <div className="uprava-members">
            {upravniOdbor.map((clan) => (
              <article className="uprava-member" key={clan.ime}>
                <div className="uprava-avatar" aria-hidden="true">
                  {clan.ime.split(" ").map((dio) => dio[0]).join("")}
                </div>
                <div>
                  <h3>{clan.ime}</h3>
                  <p>{clan.uloga}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="uprava-section uprava-container">
        <div className="uprava-organ-grid">
          <PopisTijela naslov="Nadzorni odbor" clanovi={nadzorniOdbor} />
          <PopisTijela naslov="Stegovni sud" clanovi={stegovniSud} />
        </div>

        <aside className="uprava-note">
          Dopredsjednik, tajnik i likvidator izabrani su na sjednici Upravnog
          odbora održanoj 18. srpnja 2023.
        </aside>
      </section>
    </main>
  );
}
