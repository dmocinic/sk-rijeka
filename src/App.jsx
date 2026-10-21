import React, { useState } from "react";
import { Menu, X, Mail, ExternalLink, MapPin, Clock, Target, ArrowRight, CalendarDays, Trophy, Users } from "lucide-react";

const club = {
  name: "Streličarski klub Rijeka",
  city: "Rijeka, Hrvatska",
  email: "strelicarski.klub.rijeka@gmail.com",
  facebook: "#",
  address: "Ružićeva 7, 51000 Rijeka",
};

const trainings = [
  { day: "Termin 1", time: "[VRIJEME]", group: "[GRUPA / KATEGORIJA]", place: "[LOKACIJA TRENINGA]" },
  { day: "Termin 2", time: "[VRIJEME]", group: "[GRUPA / KATEGORIJA]", place: "[LOKACIJA TRENINGA]" },
];

const news = [
  { date: "[DATUM]", title: "Novosti iz kluba", text: "Ovdje će se objavljivati vijesti s treninga, natjecanja i drugih aktivnosti kluba." },
  { date: "[DATUM]", title: "Natjecanja i rezultati", text: "Mjesto za izvještaje i rezultate članova Streličarskog kluba Rijeka." },
  { date: "[DATUM]", title: "Aktivnosti za nove članove", text: "Informacije za sve koji žele upoznati streličarstvo i doći na probni trening." },
];

const nav = [["o-klubu","O klubu"],["treninzi","Treninzi"],["novosti","Novosti"],["rezultati","Rezultati"],["uclani-se","Učlani se"],["kontakt","Kontakt"]];

function Button({ children, secondary = false, onClick, type = "button" }) {
  return <button type={type} onClick={onClick} className={`btn ${secondary ? "btn-secondary" : "btn-primary"}`}>{children}</button>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return <div>
    <header className="site-header"><div className="container header-inner">
      <button className="brand" onClick={() => go("pocetna")} aria-label="Početna"><span className="brand-icon"><Target /></span><span><strong>{club.name}</strong><small>{club.city}</small></span></button>
      <nav className="desktop-nav">{nav.map(([id,label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
      <button className="menu-button" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </div>{menu && <nav className="mobile-nav">{nav.map(([id,label]) => <button key={id} onClick={() => {go(id);setMenu(false)}}>{label}</button>)}</nav>}</header>
    <main>
      <section id="pocetna" className="hero"><div className="container hero-grid"><div><span className="eyebrow-light">Streličarstvo u Rijeci</span><h1>Preciznost.<br/><em>Koncentracija.</em><br/>Sport.</h1><p>Dobrodošli u Streličarski klub Rijeka. Mjesto za upoznavanje streličarstva, trening, razvoj vještina i natjecateljski sport.</p><div className="actions"><Button onClick={() => go("uclani-se")}>Želim trenirati</Button><Button secondary onClick={() => go("treninzi")}>Raspored treninga</Button></div></div><div className="target-wrap" aria-hidden="true"><div className="target t1"><div className="target t2"><div className="target t3"><div className="target t4"/></div></div></div></div></div></section>
      <section id="o-klubu" className="section container"><div className="two-col"><div><span className="eyebrow">O KLUBU</span><h2>Dobrodošli u Streličarski klub Rijeka</h2></div><div><p>Klub okuplja ljubitelje streličarstva i pruža prostor za trening, učenje i sportski razvoj. Ovdje će biti unesena stvarna povijest kluba i detalji o njegovu radu.</p><p className="notice">Prije javne objave zamijenite preostale oznake u uglatim zagradama stvarnim podacima kluba.</p></div></div><div className="cards three">{[[Users,"Rad s mladima","Programi i treninzi prilagođeni mladim streličarima."],[Target,"Rekreativno streličarstvo","Za zainteresirane koji žele upoznati i redovito trenirati streličarstvo."],[Trophy,"Natjecateljski sport","Informacije o natjecanjima i rezultatima članova kluba."]].map(([Icon,t,d]) => <article className="card" key={t}><Icon/><h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section id="treninzi" className="section muted"><div className="container"><span className="eyebrow">TRENINZI</span><h2>Kada i gdje treniramo?</h2><p>Termine zamijenite stvarnim rasporedom kluba.</p><div className="cards two">{trainings.map((t,i)=><article className="card" key={i}><CalendarDays/><h3>{t.day} · {t.time}</h3><p>{t.group}</p><small><MapPin size={17}/>{t.place}</small></article>)}</div><div className="cta"><div><h3>Želite doći na prvi trening?</h3><p>Pošaljite prijavu i klub će vam se javiti s informacijama.</p></div><Button onClick={() => go("uclani-se")}>Prijavi se za probni trening</Button></div></div></section>
      <section id="novosti" className="section container"><span className="eyebrow">NOVOSTI</span><h2>Iz kluba</h2><div className="cards three">{news.map(n=><article className="news-card" key={n.title}><div className="news-image"><Target size={50}/></div><div className="news-body"><small>{n.date}</small><h3>{n.title}</h3><p>{n.text}</p></div></article>)}</div></section>
      <section id="rezultati" className="section dark"><div className="container"><span className="eyebrow red">REZULTATI</span><h2>Natjecanja i rezultati</h2><article className="result-card"><Trophy/><h3>Rezultati članova kluba</h3><p>Ovdje se mogu objavljivati naziv natjecanja, datum, mjesto, kategorija, plasman, rezultat i kratak izvještaj.</p></article></div></section>
      <section id="uclani-se" className="section container"><div className="two-col"><div><span className="eyebrow">UČLANI SE</span><h2>Želiš probati streličarstvo?</h2><p>Pošalji osnovne podatke i poruku. Prijava služi za prvi kontakt i dogovor oko dolaska na trening.</p>{["Trebam li vlastitu opremu?","Je li potrebno prethodno iskustvo?","Kako izgleda prvi trening?","Kako se mogu učlaniti?"].map(q=><div className="faq" key={q}><strong>{q}</strong><small>[ODGOVOR KLUBA]</small></div>)}</div><form className="form" onSubmit={e=>{e.preventDefault();setSent(true)}}><h3>Prijava za članstvo / probni trening</h3><div className="form-grid"><input required placeholder="Ime"/><input required placeholder="Prezime"/><input required type="number" placeholder="Godina rođenja"/><input required type="email" placeholder="E-mail"/><input type="tel" placeholder="Telefon"/><select defaultValue=""><option value="" disabled>Ranije iskustvo?</option><option>Da</option><option>Ne</option></select></div><textarea placeholder="Poruka / napomena"/><label className="consent"><input type="checkbox" required/><span>Suglasan/na sam da klub koristi navedene podatke isključivo radi odgovora na moj upit.</span></label><Button type="submit">Pošalji prijavu <ArrowRight size={18}/></Button>{sent&&<p className="success">Hvala na interesu. Demonstracijski obrazac nije poslao podatke; prije objave povežite ga s odabranom uslugom.</p>}</form></div></section>
      <section id="kontakt" className="section muted"><div className="container two-col"><div><span className="eyebrow">KONTAKT</span><h2>Javite nam se</h2><div className="contact-list"><a href={`mailto:${club.email}`}><Mail/> {club.email}</a><a href={club.facebook}><ExternalLink/> Facebook stranica kluba</a><span><MapPin/> {club.address}</span><span><Clock/> Termini treninga navedeni su u rasporedu.</span></div></div><div className="map-placeholder"><MapPin/><strong>Karta lokacije treninga</strong><small>[UNIJETI SLUŽBENU LOKACIJU TRENINGA]</small></div></div></section>
      <section id="privatnost" className="section narrow"><h2>Politika privatnosti</h2><p>Ova početna verzija obrasca ne šalje niti sprema unesene podatke. Prije povezivanja obrasca potrebno je dovršiti politiku privatnosti prema stvarnom načinu obrade podataka i navesti kontakt kluba za zahtjeve ispitanika.</p></section>
    </main>
    <footer><div className="container footer-inner"><div><strong>{club.name}</strong><small>{club.city}</small></div><div className="footer-links"><button onClick={()=>go("o-klubu")}>O klubu</button><button onClick={()=>go("treninzi")}>Treninzi</button><button onClick={()=>go("uclani-se")}>Učlani se</button><button onClick={()=>go("kontakt")}>Kontakt</button><button onClick={()=>go("privatnost")}>Politika privatnosti</button></div><small>© {new Date().getFullYear()} {club.name}</small></div></footer>
  </div>;
}
