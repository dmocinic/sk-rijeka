import React, { useEffect, useState } from "react";
import { Menu, X, History, Users, Home, Mail, Phone, ExternalLink, CalendarDays, UserPlus, MapPin, Trophy, Images, Newspaper } from "lucide-react";
import Povijest from "./Povijest.jsx";
import Uprava from "./Uprava.jsx";
import Treninzi from "./Treninzi.jsx";
import Rezultati from "./Rezultati.jsx";
import Galerija from "./Galerija.jsx";
import Kontakt from "./Kontakt.jsx";
import ProbniTrening from "./ProbniTrening.jsx";
import PolitikaPrivatnosti from "./PolitikaPrivatnosti.jsx";
import Novosti from "./Novosti.jsx";
import AdminNovosti from "./AdminNovosti.jsx";
import NajnovijeNovosti from "./NajnovijeNovosti.jsx";
import "./app.css";

const routes = {
  pocetna: "Početna", povijest: "Povijest", uprava: "Uprava", treninzi: "Treninzi",
  rezultati: "Rezultati", galerija: "Galerija", novosti: "Novosti", kontakt: "Kontakt",
  "probni-trening": "Prijavi se", privatnost: "Politika privatnosti", admin: "Admin novosti",
};
const getRoute = () => { const hash = window.location.hash.replace("#/", "").replace("#", ""); return Object.hasOwn(routes, hash) ? hash : "pocetna"; };

function Pocetna() {
  return <main>
    <section className="app-home-hero"><div className="app-shell app-home-grid"><div><p className="app-kicker">STRELIČARSKI KLUB RIJEKA · OD 1974.</p><h1>Preciznost.<br/><em>Koncentracija.</em><br/>Sport.</h1><p className="app-home-lead">Upoznajte povijest kluba, upravu, trenere, rezultate i klupsku fototeku te se prijavite za probni trening.</p><div className="app-actions"><a className="app-button app-button-primary" href="#/probni-trening"><UserPlus/> Prijavi se za probni trening</a><a className="app-button app-button-secondary" href="#/treninzi"><CalendarDays/> Raspored treninga</a></div></div><div className="app-target" aria-hidden="true"><div className="app-target-ring app-target-dark"><div className="app-target-ring app-target-white"><div className="app-target-ring app-target-blue"><div className="app-target-ring app-target-red"><div className="app-target-ring app-target-yellow"/></div></div></div></div></div></div></section>
    <NajnovijeNovosti/>
    <section className="app-home-links"><div className="app-shell"><p className="app-kicker">ISTRAŽITE KLUB</p><h2>Više od pola stoljeća riječkog streličarstva</h2><div className="app-feature-grid"><a className="app-feature-card" href="#/povijest"><History/><h3>Povijest</h3><p>Od osnivanja do modernih generacija.</p></a><a className="app-feature-card" href="#/rezultati"><Trophy/><h3>Rezultati</h3><p>Državni i međunarodni uspjesi.</p></a><a className="app-feature-card" href="#/galerija"><Images/><h3>Galerija</h3><p>Povijest, treninzi, natjecanja i događanja.</p></a><a className="app-feature-card" href="#/novosti"><Newspaper/><h3>Novosti</h3><p>Natjecanja, rezultati, treninzi i klupske aktivnosti.</p></a><a className="app-feature-card" href="#/kontakt"><MapPin/><h3>Kontakt</h3><p>Lokacija, telefoni, e-mail i Facebook.</p></a></div></div></section>
    <section className="app-contact-strip"><div className="app-shell app-contact-grid"><div><p className="app-kicker">KONTAKT</p><h2>Javite nam se</h2></div><div className="app-contact-links"><a href="mailto:strelicarski.klub.rijeka@gmail.com"><Mail/> strelicarski.klub.rijeka@gmail.com</a><a href="tel:+385977733189"><Phone/> 097 773 3189</a><a href="tel:+38598442264"><Phone/> 098 442 264</a><a href="https://www.facebook.com/profile.php?id=100054633660964" target="_blank" rel="noreferrer"><ExternalLink/> Facebook</a></div></div></section>
  </main>;
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const fn = () => { setRoute(getRoute()); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }; window.addEventListener("hashchange", fn); return () => window.removeEventListener("hashchange", fn); }, []);
  const content = route === "povijest" ? <Povijest/> : route === "uprava" ? <Uprava/> : route === "treninzi" ? <Treninzi/> : route === "rezultati" ? <Rezultati/> : route === "galerija" ? <Galerija/> : route === "novosti" ? <Novosti/> : route === "kontakt" ? <Kontakt/> : route === "probni-trening" ? <ProbniTrening/> : route === "privatnost" ? <PolitikaPrivatnosti/> : route === "admin" ? <AdminNovosti/> : <Pocetna/>;
  return <div className="app-site"><header className="app-header"><div className="app-shell app-header-inner"><a className="app-brand" href="#/pocetna"><img className="app-brand-logo" src="/images/logo/sk-rijeka-logo.png" alt="Streličarski klub Rijeka"/><span><strong>Streličarski klub Rijeka</strong><small>Rijeka, Hrvatska</small></span></a><nav className="app-nav"><a href="#/pocetna"><Home/>Početna</a><a href="#/povijest"><History/>Povijest</a><a href="#/uprava"><Users/>Uprava</a><a href="#/treninzi"><CalendarDays/>Treninzi</a><a href="#/rezultati"><Trophy/>Rezultati</a><a href="#/galerija"><Images/>Galerija</a><a href="#/novosti"><Newspaper/>Novosti</a><a href="#/kontakt"><MapPin/>Kontakt</a><a href="#/probni-trening"><UserPlus/>Prijavi se</a></nav><button className="app-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Izbornik">{menuOpen ? <X/> : <Menu/>}</button></div>{menuOpen && <nav className="app-mobile-nav"><a href="#/pocetna">Početna</a><a href="#/povijest">Povijest</a><a href="#/uprava">Uprava</a><a href="#/treninzi">Treninzi</a><a href="#/rezultati">Rezultati</a><a href="#/galerija">Galerija</a><a href="#/novosti">Novosti</a><a href="#/kontakt">Kontakt</a><a href="#/probni-trening">Prijavi se</a></nav>}</header>{content}<footer className="app-footer"><div className="app-shell app-footer-inner"><div><strong>Streličarski klub Rijeka</strong><small>Osnovan 25. prosinca 1974.</small></div><nav><a href="#/pocetna">Početna</a><a href="#/povijest">Povijest</a><a href="#/rezultati">Rezultati</a><a href="#/galerija">Galerija</a><a href="#/novosti">Novosti</a><a href="#/kontakt">Kontakt</a><a href="#/probni-trening">Prijavi se</a><a href="#/privatnost">Politika privatnosti</a></nav></div></footer></div>;
}
