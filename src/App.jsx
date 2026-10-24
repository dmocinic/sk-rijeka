import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown, History, Users, Home, Mail, Phone, ExternalLink, CalendarDays, UserPlus, MapPin, Trophy, Images, Newspaper, Clock3 } from "lucide-react";
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
    <section className="app-home-hero"><div className="app-shell app-home-grid"><div><p className="app-kicker">STRELIČARSKI KLUB RIJEKA</p><h1>Preciznost.<br/><em>Koncentracija.</em><br/>Sport.</h1><p className="app-home-lead">Upoznajte povijest kluba, trenere i rezultate ili napravite prvi korak i prijavite se za probni trening.</p><div className="app-actions"><a className="app-button app-button-primary" href="#/probni-trening"><UserPlus/> Prijavi se za probni trening</a><a className="app-button app-button-secondary" href="#/treninzi"><CalendarDays/> Raspored treninga</a></div></div><div className="app-target"><img className="app-target-image" src="/images/hero/strelicarska-meta.jpg" alt="Streličarska meta"/></div></div></section>

    <NajnovijeNovosti/>

    <section className="app-home-training"><div className="app-shell"><div className="app-section-heading"><div><p className="app-kicker">TRENING</p><h2>Dođite upoznati streličarstvo</h2></div><p>Treniramo u dvorani na Ružićevoj 7 u Rijeci. Posebni termini za mlađe kategorije U11, U13 i U15 su utorkom i četvrtkom.</p></div><div className="app-training-grid"><article><Clock3/><span>Ponedjeljak, srijeda, petak</span><strong>18:00 – 20:00</strong><small>Sve kategorije</small></article><article><CalendarDays/><span>Utorak i četvrtak</span><strong>18:00 – 20:00</strong><small>U11, U13 i U15</small></article><article className="app-training-cta"><MapPin/><span>Lokacija</span><strong>Ružićeva 7, Rijeka</strong><a href="#/treninzi">Detaljan raspored →</a></article></div></div></section>

    <section className="app-home-links"><div className="app-shell"><p className="app-kicker">ISTRAŽITE KLUB</p><h2>Više od pola stoljeća riječkog streličarstva</h2><div className="app-feature-grid"><a className="app-feature-card" href="#/povijest"><History/><h3>Povijest kluba</h3><p>Priča o razvoju kluba, generacijama streličara i važnim trenucima.</p><strong>Otvori povijest →</strong></a><a className="app-feature-card" href="#/rezultati"><Trophy/><h3>Rezultati</h3><p>Državni i međunarodni uspjesi, od najnovijih prema starijima.</p><strong>Pogledaj rezultate →</strong></a><a className="app-feature-card" href="#/galerija"><Images/><h3>Galerija</h3><p>Fotografije iz povijesti, treninga, natjecanja i klupskih događanja.</p><strong>Otvori galeriju →</strong></a><a className="app-feature-card" href="#/novosti"><Newspaper/><h3>Novosti</h3><p>Aktualnosti s natjecanja, treninga i ostalih aktivnosti SK Rijeka.</p><strong>Sve novosti →</strong></a></div></div></section>

    <section className="app-contact-strip"><div className="app-shell app-contact-grid"><div><p className="app-kicker">KONTAKT</p><h2>Javite nam se</h2><p className="app-contact-copy">Imate pitanje ili želite probati streličarstvo? Kontaktirajte klub ili odmah pošaljite prijavu za probni trening.</p></div><div className="app-contact-links"><a href="mailto:strelicarski.klub.rijeka@gmail.com"><Mail/> strelicarski.klub.rijeka@gmail.com</a><a href="tel:+385977733189"><Phone/> 097 773 3189</a><a href="tel:+38598442264"><Phone/> 098 442 264</a><a href="https://www.facebook.com/profile.php?id=100054633660964" target="_blank" rel="noreferrer"><ExternalLink/> Facebook</a></div></div></section>
  </main>;
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const fn = () => { setRoute(getRoute()); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }; window.addEventListener("hashchange", fn); return () => window.removeEventListener("hashchange", fn); }, []);
  const content = route === "povijest" ? <Povijest/> : route === "uprava" ? <Uprava/> : route === "treninzi" ? <Treninzi/> : route === "rezultati" ? <Rezultati/> : route === "galerija" ? <Galerija/> : route === "novosti" ? <Novosti/> : route === "kontakt" ? <Kontakt/> : route === "probni-trening" ? <ProbniTrening/> : route === "privatnost" ? <PolitikaPrivatnosti/> : route === "admin" ? <AdminNovosti/> : <Pocetna/>;
  const aboutActive = route === "povijest" || route === "uprava";
  return <div className="app-site"><header className="app-header"><div className="app-shell app-header-inner"><a className="app-brand" href="#/pocetna"><img className="app-brand-logo" src="/images/logo/sk-rijeka-logo.png" alt="Streličarski klub Rijeka"/><span><strong>Streličarski klub Rijeka</strong><small>Rijeka, Hrvatska</small></span></a><nav className="app-nav" aria-label="Glavna navigacija"><a className={route === "pocetna" ? "active" : ""} href="#/pocetna"><Home/>Početna</a><div className={`app-nav-dropdown ${aboutActive ? "active" : ""}`}><button type="button"><Users/>O klubu<ChevronDown/></button><div className="app-nav-dropdown-menu"><a href="#/povijest"><History/>Povijest</a><a href="#/uprava"><Users/>Uprava</a></div></div><a className={route === "treninzi" ? "active" : ""} href="#/treninzi"><CalendarDays/>Treninzi</a><a className={route === "rezultati" ? "active" : ""} href="#/rezultati"><Trophy/>Rezultati</a><a className={route === "novosti" ? "active" : ""} href="#/novosti"><Newspaper/>Novosti</a><a className={route === "galerija" ? "active" : ""} href="#/galerija"><Images/>Galerija</a><a className={route === "kontakt" ? "active" : ""} href="#/kontakt"><MapPin/>Kontakt</a><a className="app-nav-cta" href="#/probni-trening"><UserPlus/>Prijavi se</a></nav><button className="app-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Izbornik" aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button></div>{menuOpen && <nav className="app-mobile-nav" aria-label="Mobilna navigacija"><a href="#/pocetna">Početna</a><div className="app-mobile-group"><span>O KLUBU</span><a href="#/povijest">Povijest</a><a href="#/uprava">Uprava</a></div><a href="#/treninzi">Treninzi</a><a href="#/rezultati">Rezultati</a><a href="#/novosti">Novosti</a><a href="#/galerija">Galerija</a><a href="#/kontakt">Kontakt</a><a className="app-mobile-cta" href="#/probni-trening">Prijavi se za probni trening</a></nav>}</header>{content}<footer className="app-footer"><div className="app-shell app-footer-inner"><div><strong>Streličarski klub Rijeka</strong><small>Rijeka, Hrvatska</small></div><nav><a href="#/pocetna">Početna</a><a href="#/povijest">Povijest</a><a href="#/uprava">Uprava</a><a href="#/treninzi">Treninzi</a><a href="#/rezultati">Rezultati</a><a href="#/novosti">Novosti</a><a href="#/galerija">Galerija</a><a href="#/kontakt">Kontakt</a><a href="#/privatnost">Politika privatnosti</a></nav></div></footer></div>;
}
