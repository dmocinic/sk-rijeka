import React, { useEffect, useState } from "react";
import { Menu, X, Target, History, Users, Home, Mail, Phone, ExternalLink, CalendarDays, UserPlus, ShieldCheck } from "lucide-react";
import Povijest from "./Povijest.jsx";
import Uprava from "./Uprava.jsx";
import Treninzi from "./Treninzi.jsx";
import ProbniTrening from "./ProbniTrening.jsx";
import PolitikaPrivatnosti from "./PolitikaPrivatnosti.jsx";
import "./app.css";

const routes = {
  pocetna: "Početna",
  povijest: "Povijest",
  uprava: "Uprava",
  treninzi: "Treninzi",
  "probni-trening": "Prijavi se",
  privatnost: "Politika privatnosti",
};

function getRoute() {
  const hash = window.location.hash.replace("#/", "").replace("#", "");
  return Object.hasOwn(routes, hash) ? hash : "pocetna";
}

function Pocetna() {
  return (
    <main>
      <section className="app-home-hero">
        <div className="app-shell app-home-grid">
          <div>
            <p className="app-kicker">STRELIČARSKI KLUB RIJEKA · OD 1974.</p>
            <h1>Preciznost.<br /><em>Koncentracija.</em><br />Sport.</h1>
            <p className="app-home-lead">
              Dobrodošli na razvojnu verziju web-stranice Streličarskog kluba Rijeka.
              Upoznajte povijest kluba, ljude koji vode njegov rad te raspored treninga i trenere.
            </p>
            <div className="app-actions">
              <a className="app-button app-button-primary" href="#/probni-trening"><UserPlus /> Prijavi se za probni trening</a>
              <a className="app-button app-button-secondary" href="#/povijest"><History /> Povijest kluba</a>
            </div>
          </div>
          <div className="app-target" aria-hidden="true">
            <div className="app-target-ring app-target-dark"><div className="app-target-ring app-target-white"><div className="app-target-ring app-target-blue"><div className="app-target-ring app-target-red"><div className="app-target-ring app-target-yellow" /></div></div></div></div>
          </div>
        </div>
      </section>

      <section className="app-home-links">
        <div className="app-shell">
          <p className="app-kicker">ISTRAŽITE KLUB</p>
          <h2>Više od pola stoljeća riječkog streličarstva</h2>
          <div className="app-feature-grid">
            <a className="app-feature-card" href="#/povijest"><span className="app-feature-icon"><History /></span><h3>Povijest kluba</h3><p>Od prvih početaka i osnivanja 1974. do reprezentativaca, državnih prvaka i rezultata novih generacija.</p><strong>Otvori povijest →</strong></a>
            <a className="app-feature-card" href="#/uprava"><span className="app-feature-icon"><Users /></span><h3>Uprava kluba</h3><p>Predsjednik, dopredsjednik, tajnik, Upravni odbor, Nadzorni odbor i druga tijela kluba.</p><strong>Otvori upravu →</strong></a>
            <a className="app-feature-card" href="#/treninzi"><span className="app-feature-icon"><CalendarDays /></span><h3>Treninzi i treneri</h3><p>Raspored treninga, lokacija i stručni kadar prema programu kluba za 2027.</p><strong>Pogledaj raspored →</strong></a>
          </div>
        </div>
      </section>

      <section className="app-contact-strip">
        <div className="app-shell app-contact-grid">
          <div><p className="app-kicker">KONTAKT</p><h2>Javite nam se</h2></div>
          <div className="app-contact-links">
            <a href="mailto:strelicarski.klub.rijeka@gmail.com"><Mail /> strelicarski.klub.rijeka@gmail.com</a>
            <a href="tel:+385977733189"><Phone /> 097 773 3189</a>
            <a href="tel:+38598442264"><Phone /> 098 442 264</a>
            <a href="https://www.facebook.com/profile.php?id=100054633660964" target="_blank" rel="noreferrer"><ExternalLink /> Facebook</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const content = route === "povijest" ? <Povijest /> : route === "uprava" ? <Uprava /> : route === "treninzi" ? <Treninzi /> : route === "probni-trening" ? <ProbniTrening /> : route === "privatnost" ? <PolitikaPrivatnosti /> : <Pocetna />;

  return (
    <div className="app-site">
      <header className="app-header">
        <div className="app-shell app-header-inner">
          <a className="app-brand" href="#/pocetna" aria-label="Početna stranica"><span className="app-brand-mark"><Target /></span><span><strong>Streličarski klub Rijeka</strong><small>Rijeka, Hrvatska</small></span></a>
          <nav className="app-nav" aria-label="Glavna navigacija">
            <a className={route === "pocetna" ? "active" : ""} href="#/pocetna"><Home /> Početna</a>
            <a className={route === "povijest" ? "active" : ""} href="#/povijest"><History /> Povijest</a>
            <a className={route === "uprava" ? "active" : ""} href="#/uprava"><Users /> Uprava</a>
            <a className={route === "treninzi" ? "active" : ""} href="#/treninzi"><CalendarDays /> Treninzi</a>
            <a className={route === "probni-trening" ? "active" : ""} href="#/probni-trening"><UserPlus /> Prijavi se</a>
          </nav>
          <button className="app-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Otvori izbornik">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="app-mobile-nav" aria-label="Mobilna navigacija"><a href="#/pocetna"><Home /> Početna</a><a href="#/povijest"><History /> Povijest</a><a href="#/uprava"><Users /> Uprava</a><a href="#/treninzi"><CalendarDays /> Treninzi</a><a href="#/probni-trening"><UserPlus /> Prijavi se</a></nav>}
      </header>
      {content}
      <footer className="app-footer"><div className="app-shell app-footer-inner"><div><strong>Streličarski klub Rijeka</strong><small>Osnovan 25. prosinca 1974.</small></div><nav><a href="#/pocetna">Početna</a><a href="#/povijest">Povijest</a><a href="#/uprava">Uprava</a><a href="#/treninzi">Treninzi</a><a href="#/probni-trening">Prijavi se</a><a href="#/privatnost">Politika privatnosti</a></nav><small>© {new Date().getFullYear()} Streličarski klub Rijeka</small></div></footer>
    </div>
  );
}
