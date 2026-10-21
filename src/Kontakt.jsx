import React from "react";
import { Mail, Phone, MapPin, Facebook, Clock, CalendarDays, UserPlus } from "lucide-react";
import "./kontakt.css";

const termini = [
  ["Ponedjeljak", "18:00 – 20:00", "Sve kategorije"],
  ["Utorak", "18:00 – 20:00", "U11, U13, U15"],
  ["Srijeda", "18:00 – 20:00", "Sve kategorije"],
  ["Četvrtak", "18:00 – 20:00", "U11, U13, U15"],
  ["Petak", "18:00 – 20:00", "Sve kategorije"],
];

export default function Kontakt() {
  return (
    <main className="contact-page">
      <header className="contact-hero">
        <div className="contact-container">
          <p className="contact-kicker">STRELIČARSKI KLUB RIJEKA</p>
          <h1>Kontakt</h1>
          <p>Javite nam se za informacije o treninzima, probnom treningu i radu kluba.</p>
        </div>
      </header>

      <section className="contact-section contact-container">
        <div className="contact-grid">
          <article className="contact-card">
            <span className="contact-icon"><Mail /></span><h2>E-mail</h2>
            <a href="mailto:strelicarski.klub.rijeka@gmail.com">strelicarski.klub.rijeka@gmail.com</a>
          </article>
          <article className="contact-card">
            <span className="contact-icon"><Phone /></span><h2>Telefon</h2>
            <a href="tel:+385977733189">097 773 3189</a><a href="tel:+38598442264">098 442 264</a>
          </article>
          <article className="contact-card">
            <span className="contact-icon"><MapPin /></span><h2>Lokacija treninga</h2>
            <p>Ružićeva 7<br/>51000 Rijeka</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Ru%C5%BEi%C4%87eva%207%2C%20Rijeka" target="_blank" rel="noreferrer">Otvori kartu</a>
          </article>
          <article className="contact-card">
            <span className="contact-icon"><Facebook /></span><h2>Facebook</h2>
            <a href="https://www.facebook.com/profile.php?id=100054633660964" target="_blank" rel="noreferrer">Streličarski klub Rijeka</a>
          </article>
        </div>
      </section>

      <section className="contact-section contact-soft">
        <div className="contact-container">
          <p className="contact-kicker">TRENING</p><h2 className="contact-title">Kada treniramo?</h2>
          <div className="contact-schedule">{termini.map(([dan,vrijeme,grupa]) => <article key={dan}><CalendarDays/><div><strong>{dan}</strong><span>{vrijeme}</span><small>{grupa}</small></div></article>)}</div>
          <div className="contact-cta"><div><h2>Želiš probati streličarstvo?</h2><p>Pošalji prijavu za probni trening izravno putem web-stranice.</p></div><a href="#/probni-trening"><UserPlus/> Prijavi se za probni trening</a></div>
        </div>
      </section>
    </main>
  );
}
