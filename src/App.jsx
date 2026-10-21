import React from "react";
import { Mail, Phone, Target } from "lucide-react";

export default function App() {
  return (
    <main className="coming-soon">
      <section className="coming-soon-card">
        <div className="coming-soon-icon" aria-hidden="true"><Target /></div>
        <p className="coming-soon-kicker">STRELIČARSKI KLUB RIJEKA</p>
        <h1>Nova web stranica je u izradi.</h1>
        <p className="coming-soon-text">
          Uskoro se vraćamo s informacijama o treninzima, natjecanjima i aktivnostima kluba.
        </p>
        <div className="coming-soon-contacts">
          <a href="mailto:strelicarski.klub.rijeka@gmail.com"><Mail /> strelicarski.klub.rijeka@gmail.com</a>
          <a href="tel:+385977733189"><Phone /> 097 773 3189</a>
          <a href="tel:+38598442264"><Phone /> 098 442 264</a>
        </div>
        <p className="coming-soon-domain">sk-rijeka.hr</p>
      </section>
    </main>
  );
}
