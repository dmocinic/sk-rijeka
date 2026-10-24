import React, { useMemo, useState } from "react";
import { Trophy, Medal, Globe2, Search } from "lucide-react";
import "./rezultati.css";

const rezultati = [
  { godina:"1979", naslov:"Kup nacija u Mađarskoj", tip:"Međunarodno", detalj:"Siniša Šarić osvaja 1., a Hrvoje Šarić 2. mjesto. Iste godine nastupaju i na Europskom juniorskom prvenstvu u Portugalu." },
  { godina:"1980", naslov:"Državno dvoransko prvenstvo", tip:"Državno", detalj:"Olanda Đaković, Marina Marković i Nives Jerčinović osvajaju momčadsko zlato u seniorskoj kategoriji." },
  { godina:"1985.–1987.", naslov:"Razdoblje velikih momčadskih uspjeha", tip:"Klupski uspjeh", detalj:"Klupski materijali bilježe 38 seniorskih momčadskih postolja, od kojih 26 zlatnih, te niz od 20 uzastopnih momčadskih pobjeda." },
  { godina:"1986", naslov:"Europsko prvenstvo u Izmiru", tip:"Reprezentacija", detalj:"Sva četiri mjesta seniorske reprezentacije tadašnje Jugoslavije izborili su članovi SK Rijeka: Aleksandar „Saša” Milinković, Hrvoje Šarić, Siniša Šarić i Srđan Superina. Voditelj reprezentacije bio je Josip Šarić." },
  { godina:"2005.–2008.", naslov:"Nova generacija državnih prvaka", tip:"Međunarodno", detalj:"Anton Šiša nastupa na Svjetskom juniorskom prvenstvu 2006. i Europskom juniorskom prvenstvu 2007., a Anđelo Šuvak 2008. na Europskom juniorskom kupu te Svjetskom juniorskom i kadetskom prvenstvu." },
  { godina:"2009", naslov:"Europski juniorski kupovi", tip:"Međunarodno", detalj:"Anđelo Šuvak nastupa na europskim juniorskim kupovima u Legnici i Sarzani te na juniorskom i kadetskom svjetskom prvenstvu." },
  { godina:"2010", naslov:"Europska natjecanja", tip:"Međunarodno", detalj:"Adriano Baćac, Antonio Damiš i Anđelo Šuvak nastupaju na Europskom dvoranskom prvenstvu u Poreču, a članovi kluba i na Europskom juniorskom prvenstvu i Juniorskom kupu u Winnendenu." },
  { godina:"2011", naslov:"Srednjoeuropski kup i FIELD EP", tip:"Međunarodno", detalj:"Robert Šandorka u klupskom pregledu naveden je kao ukupni pobjednik Srednjoeuropskog kupa. Anđelo Šuvak osvaja 5. mjesto na FIELD prvenstvu Europe u Montevarchiju." },
  { godina:"2012", naslov:"Državna zlata i Europski juniorski kup", tip:"Državno", detalj:"Antonio Damiš i Robert Šandorka osvajaju pojedinačna prva mjesta, a seniorska ekipa Šandorka–Superina–Močinić ekipno zlato. Anđelo Šuvak zauzima 9. mjesto na Europskom juniorskom kupu u Poreču." },
  { godina:"2014", naslov:"Svjetska juniorska bronca", tip:"Međunarodno", detalj:"Anđelo Šuvak kao član juniorske reprezentacije osvaja brončanu medalju na Svjetskom juniorskom dvoranskom prvenstvu u Nîmesu. Paula Močinić postavlja državni rekord od 677 krugova u kategoriji djevojčica do 12 godina." },
  { godina:"2015.–2018.", naslov:"Državni prvaci i reprezentativni nastupi", tip:"Reprezentacija", detalj:"Klub osvaja državne naslove u dječjim, kadetskim i seniorskim kategorijama. Paula Močinić nastupa na Europskom juniorskom kupu 2017., a 2018. na Europskom kadetskom prvenstvu, Europskom juniorskom kupu i dvoranskom Svjetskom kupu." },
  { godina:"2019", naslov:"Europsko ekipno srebro mladih", tip:"Međunarodno", detalj:"Paula Močinić i Erika Raimund iz SK Rijeka, zajedno s Tihanom Kovačić iz SK Navaho, osvajaju 2. mjesto za Hrvatsku na Europskom kupu mladih u Čatežu. U Nîmesu Paula Močinić osvaja 9., a Dorjan Močinić 6. mjesto u veteranskoj konkurenciji." },
  { godina:"2020", naslov:"Naslovi u FIELD-u i WA 720", tip:"Državno", detalj:"Paula Močinić osvaja prvo mjesto u juniorskom FIELD-u i WA 720, Laura Haramija prvo mjesto u kadetskom FIELD-u, Erika Raimund prvo mjesto u kadetskom WA 720, a Luka Kaštelan prvo mjesto u juniorskom WA 720." },
  { godina:"2021", naslov:"Državni naslovi", tip:"Državno", detalj:"Mika Radović osvaja naslov državne prvakinje U14 u WA 720, a kadetska ekipa SK Rijeka ekipni naslov u WA 720. Paula Močinić i Dorjan Močinić osvajaju srebrne medalje na državnom prvenstvu." },
  { godina:"2022", naslov:"Pojedinačni i ekipni naslovi", tip:"Državno", detalj:"Paula Močinić postaje državna prvakinja U21 u WA 720, Laura Haramija državna prvakinja U21 u WA 2x18, a SK Rijeka osvaja ekipne državne naslove u WA 2x18 za U18 i U21 te u WA 720 za U21." },
  { godina:"2023", naslov:"Pet pojedinačnih državnih naslova", tip:"Državno", detalj:"Paula Močinić osvaja seniorske naslove u WA 720 i WA 2x18, Mika Radović naslov U18 u WA 2x18, a Vita Justić naslove U13 u WA 720 i WA 2x18. Ekipa SK Rijeka osvaja naslov U18 u WA 2x18." },
  { godina:"2024", naslov:"Državni prvaci", tip:"Državno", detalj:"Erika Raimund osvaja seniorski naslov u WA 720. Državne naslove u WA 2x18 osvajaju Vita Justić, Marko Stanišić, Vega Valentina Vukić i Mika Radović; Vita Justić osvaja naslove u dvije navedene dobne kategorije." },
  { godina:"2025", naslov:"Novi naslovi mladih", tip:"Državno", detalj:"Mika Radović osvaja državni naslov U21 u WA 2x18, a Ema Marčac naslov U15 u WA 2x18. Medalje osvajaju i Vega Valentina Vukić, Romina Ledionko i Erika Raimund." },
  { godina:"2026", naslov:"Nova generacija državnih prvaka", tip:"Državno", detalj:"Romina Ledinko osvaja naslov mlađih kadetkinja u WA 2x18, Fabian Alt i Paola Turkalj naslove mlađih kadeta u WA 720, a klub osvaja i ekipne državne naslove u više mlađih kategorija." },
];

const tipovi = ["Sve", "Državno", "Međunarodno", "Reprezentacija", "Klupski uspjeh"];

export default function Rezultati(){
  const [tip,setTip]=useState("Sve"); const [q,setQ]=useState("");
  const prikaz=useMemo(() => rezultati
    .filter(r => (tip === "Sve" || r.tip === tip) && `${r.godina} ${r.naslov} ${r.detalj}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      const godinaA = Math.max(...(a.godina.match(/\d{4}/g) || ["0"]).map(Number));
      const godinaB = Math.max(...(b.godina.match(/\d{4}/g) || ["0"]).map(Number));
      return godinaB - godinaA;
    }), [tip, q]);
  return <main className="results-page">
    <header className="results-hero"><div className="results-container"><h1>Rezultati</h1><p>Izbor značajnijih državnih i međunarodnih rezultata Streličarskog kluba Rijeka, sastavljen iz sačuvanih klupskih materijala i izvještaja.</p></div></header>
    <section className="results-section results-container">
      <div className="results-summary"><article><Trophy/><strong>1979.–2026.</strong><span>izdvojeni rezultati u dostupnim materijalima</span></article><article><Globe2/><strong>Međunarodno</strong><span>europska i svjetska natjecanja</span></article><article><Medal/><strong>Državno</strong><span>pojedinačni i ekipni naslovi</span></article></div>
      <div className="results-toolbar"><div className="results-search"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pretraži godinu, ime ili natjecanje"/></div><div className="results-filters">{tipovi.map(t=><button className={tip===t?"active":""} onClick={()=>setTip(t)} key={t}>{t}</button>)}</div></div>
      <div className="results-list">{prikaz.map(r=><article key={`${r.godina}-${r.naslov}`}><div className="results-year">{r.godina}</div><div><span className="results-type">{r.tip}</span><h2>{r.naslov}</h2><p>{r.detalj}</p></div></article>)}</div>
      <aside className="results-note">Prikazan je izbor značajnijih rezultata iz dostupne klupske arhive.</aside>
    </section>
  </main>
}
