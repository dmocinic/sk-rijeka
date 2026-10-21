import React from "react";
import "./povijest.css";

const timeline = [
  {
    year: "1950-e",
    title: "Prvi koraci riječkog streličarstva",
    text: "Počeci organiziranog sportskog gađanja lukom i strijelom u Rijeci vezani su uz sportske aktivnosti u Tvornici traktora i motora Torpedo te uz djelovanje Rade Milinkovića."
  },
  {
    year: "1966.",
    title: "Međunarodno natjecanje u Rijeci",
    text: "U Rijeci se održava međunarodno streličarsko natjecanje, a riječkim streličarima znanje prenosi poljski trener V. Novakowski."
  },
  {
    year: "25. 12. 1974.",
    title: "Osnivanje Streličarskog kluba Rijeka",
    text: "Za predsjednika je izabran Rade Milinković, za podpredsjednika Josip Šarić, a za tajnika Mirko Kolić."
  },
  {
    year: "1976.",
    title: "Prvi veliki uspjesi mladih",
    text: "Najmlađa riječka momčad osvaja momčadsko zlato na međunarodnom turniru na Kantridi i naslov državnog prvaka u kategoriji dječaka do 14 godina."
  },
  {
    year: "1977.–1978.",
    title: "Rijeka domaćin europskih susreta",
    text: "Na Krimeji se održavaju veliki međunarodni susreti nacija, uz nastupe istaknutih europskih streličara."
  },
  {
    year: "1979.",
    title: "Braća Šarić na međunarodnoj sceni",
    text: "Siniša i Hrvoje Šarić osvajaju prvo i drugo mjesto na Kupu nacija u Mađarskoj te nastupaju na Europskom juniorskom prvenstvu u Portugalu."
  },
  {
    year: "1980.",
    title: "Zlato riječke ženske momčadi",
    text: "Olanda Đaković, Marina Marković i Nives Jerčinović osvajaju momčadsko zlato na Državnom dvoranskom prvenstvu u Rijeci."
  },
  {
    year: "1980-e",
    title: "Zlatna generacija",
    text: "Riječki streličari osvajaju državne naslove, postavljaju rekorde i ostvaruju zapažene međunarodne rezultate u juniorskoj i seniorskoj konkurenciji."
  },
  {
    year: "1986.",
    title: "Četiri reprezentativca, jedan klub",
    text: "Sva četiri mjesta u seniorskoj reprezentaciji za Europsko prvenstvo u Izmiru izborili su članovi SK Rijeka: Aleksandar „Saša” Milinković, Hrvoje Šarić, Siniša Šarić i Srđan Superina. Voditelj reprezentacije bio je Josip Šarić."
  },
  {
    year: "1990.–2015.",
    title: "Znanje se prenosi novim generacijama",
    text: "Nakon natjecateljske karijere Hrvoje Šarić preuzima trenersku ulogu i sudjeluje u razvoju novih naraštaja riječkih streličara."
  }
];

export default function Povijest() {
  return (
    <main className="history-page">
      <header className="history-hero">
        <div className="history-container history-hero-grid">
          <div>
            <p className="history-kicker">STRELIČARSKI KLUB RIJEKA</p>
            <h1>Povijest kluba</h1>
            <p className="history-lead">
              Od prvih streličarskih koraka u riječkom Torpedu do državnih prvaka,
              reprezentativaca i velikih međunarodnih turnira, povijest kluba priča je
              o radu, koncentraciji, prijateljstvu i generacijama koje su odrastale uz luk i strijelu.
            </p>
            <a className="history-cta" href="#vremenska-crta">Pogledaj vremensku crtu</a>
          </div>
          <figure className="history-chronicle">
            <img src="/images/kronika-osnivanje.jpg" alt="Stranica klupske kronike o osnivanju Streličarskog kluba Rijeka" />
            <figcaption>Izvorni zapis iz klupske kronike</figcaption>
          </figure>
        </div>
      </header>

      <section className="history-section history-container history-intro">
        <p className="history-kicker">PRIJE FORMALNOG OSNIVANJA</p>
        <h2>Počeci riječkog streličarstva</h2>
        <div className="history-columns">
          <p>
            Korijeni riječkog streličarstva sežu u pedesete godine 20. stoljeća,
            kada se gađanje lukom i strijelom počelo razvijati kao sportska aktivnost
            u riječkoj Tvornici traktora i motora „Torpedo”.
          </p>
          <p>
            Važnu ulogu u tim počecima imao je Rade Milinković, uspješan riječki
            strijelac i sportski djelatnik. U suradnji s Nikolom Škorićem iz Zagreba
            upoznao se sa sportskim streličarstvom te potaknuo prve organizirane
            treninge i razvoj nove sportske discipline u Rijeci.
          </p>
        </div>
        <aside className="history-note">
          Povijest organiziranog streličarstva u Rijeci počinje prije pravne povijesti
          današnjeg kluba. Formalno osnivanje Streličarskog kluba Rijeka zabilježeno je
          25. prosinca 1974. godine.
        </aside>
      </section>

      <section className="history-section history-section-dark">
        <div className="history-container history-founding">
          <div>
            <p className="history-kicker">25. PROSINCA 1974.</p>
            <h2>Osnivanje Streličarskog kluba Rijeka</h2>
            <p>
              Na osnivačkoj skupštini izabrano je prvo vodstvo kluba. Time je otvoreno
              novo poglavlje organiziranog streličarstva u Rijeci, izgrađeno na iskustvu
              ranijih generacija i spremno za razvoj mladih sportaša.
            </p>
          </div>
          <div className="history-leadership" aria-label="Prvo vodstvo kluba">
            <article><span>Predsjednik</span><strong>Rade Milinković</strong></article>
            <article><span>Podpredsjednik</span><strong>Josip Šarić</strong></article>
            <article><span>Tajnik</span><strong>Mirko Kolić</strong></article>
          </div>
        </div>
      </section>

      <section className="history-section history-container">
        <p className="history-kicker">MJESTO KOJE PAMTI GENERACIJE</p>
        <h2>Krnjevo, više od streličarskog terena</h2>
        <div className="history-story-grid">
          <div>
            <p>
              Teren na Krnjevu generacijama je bio dom riječkih streličara. Na njemu
              su se održavali treninzi, pripremala natjecanja i stvarala prijateljstva.
              Stara drvena klupa, sastavljanje lukova i razgovori prije i nakon treninga
              postali su dio svakodnevnog klupskog rituala.
            </p>
            <p>
              Krnjevo nije bilo samo prostor sportskog rada. Članovima je pružalo mjesto
              susreta, podrške i pripadnosti, bez obzira na vrućinu, hladnoću, kišu ili buru.
            </p>
          </div>
          <blockquote>
            <strong>Zvižduk vlaka kao trening koncentracije</strong>
            <p>
              Željeznička pruga prolazila je neposredno ispod terena. Zvižduk lokomotive
              često bi se začuo upravo dok je streličar bio u punom nategu. Ono što je
              u početku prekidalo mir s vremenom je postalo posebna vježba koncentracije
              i jedna od najpoznatijih klupskih anegdota.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="history-section history-soft">
        <div className="history-container">
          <p className="history-kicker">RAST S MLADIM GENERACIJAMA</p>
          <h2>Od prvih treninga do međunarodnih postolja</h2>
          <div className="history-cards">
            <article>
              <h3>Prvi mladi prvaci</h3>
              <p>
                Među prvim zapaženim mladim natjecateljima bili su Ratko Buljan i
                Jadranko Klarić, osvajači juniorskih državnih naslova 1966. i 1967. godine.
                Važan stručni doprinos dao je poljski trener V. Novakowski.
              </p>
            </article>
            <article>
              <h3>Generacija sedamdesetih</h3>
              <p>
                Hrvoje i Siniša Šarić, Srđan Superina i Vili Bušac razvijali su se od
                najmlađih kategorija prema juniorskom i seniorskom streličarstvu te
                postavili temelje buduće Zlatne generacije.
              </p>
            </article>
            <article>
              <h3>Mađarska i Portugal 1979.</h3>
              <p>
                Siniša Šarić osvojio je prvo, a Hrvoje Šarić drugo mjesto na Kupu nacija
                u Mađarskoj, uz samo jedan krug razlike. Iste su godine zajedno nastupili
                na Europskom juniorskom prvenstvu u Portugalu.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="history-section history-container">
        <p className="history-kicker">RIJEKA NA MEĐUNARODNOJ KARTI</p>
        <h2>Grad velikih streličarskih susreta</h2>
        <p className="history-wide-text">
          Klub nije bio poznat samo po natjecateljima nego i po organizaciji turnira.
          Natjecanja su se održavala na Kantridi, Krimeji, u Mošćeničkoj Dragi, Kostreni,
          Dvorani mladosti i drugim riječkim sportskim prostorima. Na međunarodnim
          susretima u Rijeci nastupali su istaknuti europski i svjetski streličari.
        </p>
        <div className="history-highlight-row">
          <article>
            <span>1976.</span>
            <h3>Kantrida</h3>
            <p>
              Na međunarodnom turniru nastupio je i Giancarlo Ferrari, koji je iste
              godine osvojio olimpijsku broncu u Montrealu.
            </p>
          </article>
          <article>
            <span>1977.–1978.</span>
            <h3>Krimeja</h3>
            <p>
              Organizirani su europski susreti nacija, čime je Rijeka dodatno učvrstila
              mjesto na međunarodnoj streličarskoj karti.
            </p>
          </article>
        </div>
      </section>

      <section className="history-section history-archive">
        <div className="history-container">
          <p className="history-kicker">IZ KLUPSKE FOTOTEKE</p>
          <h2>Tragovi vremena na riječkim borilištima</h2>
          <p className="history-wide-text">
            Sačuvane fotografije bilježe okupljanja sudionika i prizore s natjecanja
            na riječkim sportskim terenima. One nadopunjuju pisanu kroniku i prenose
            atmosferu razdoblja u kojem je klub gradio svoju natjecateljsku i organizacijsku tradiciju.
          </p>
          <div className="history-photo-grid">
            <figure className="history-photo history-photo-wide">
              <img src="/images/povijesno-okupljanje.jpg" alt="Veliko grupno okupljanje sudionika na povijesnom streličarskom događaju u Rijeci" />
              <figcaption>Sudionici i uzvanici na jednom od povijesnih streličarskih događaja u Rijeci.</figcaption>
            </figure>
            <figure className="history-photo">
              <img src="/images/natjecanje-rijeka.png" alt="Streličarsko natjecanje na stadionu s nizom meta" />
              <figcaption>Prizor s natjecanja: linija meta i natjecateljski prostor na riječkom stadionu.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="history-section history-section-dark">
        <div className="history-container">
          <p className="history-kicker">OSAMDESETE GODINE</p>
          <h2>Zlatna generacija</h2>
          <p className="history-wide-text history-light-text">
            Okosnicu uspješne seniorske momčadi činili su Aleksandar „Saša” Milinković,
            Hrvoje Šarić, Siniša Šarić i Srđan Superina. Velik doprinos klupskim uspjesima
            dali su i Vili Bušac, Davor Strgačić, Goran Jakovac te brojni drugi članovi.
            U ženskom streličarstvu posebno mjesto zauzima Olanda Đaković.
          </p>
          <div className="history-stats">
            <article><strong>38</strong><span>seniorskih momčadskih postolja od 1985. do 1987.</span></article>
            <article><strong>26</strong><span>zlatnih postolja u tom razdoblju</span></article>
            <article><strong>20</strong><span>uzastopnih momčadskih pobjeda zabilježenih u klupskim materijalima</span></article>
          </div>
        </div>
      </section>

      <section className="history-section history-container history-1986">
        <p className="history-kicker">TRENUTAK ZA POVIJEST</p>
        <div className="history-year">1986.</div>
        <h2>Četiri reprezentativca. Jedan klub. Rijeka.</h2>
        <p className="history-wide-text">
          Za Europsko prvenstvo u Izmiru sva četiri mjesta u seniorskoj reprezentaciji
          tadašnje Jugoslavije izborili su članovi Streličarskog kluba Rijeka:
          Aleksandar „Saša” Milinković, Hrvoje Šarić, Siniša Šarić i Srđan Superina.
          Voditelj reprezentacije bio je Josip Šarić.
        </p>
        <p className="history-emphasis">
          Bio je to jedan od najvećih uspjeha u povijesti riječkog streličarstva i potvrda
          kvalitete generacije izgrađene dugogodišnjim radom na Krnjevu.
        </p>
      </section>

      <section className="history-section history-soft">
        <div className="history-container history-anecdote">
          <div>
            <p className="history-kicker">PRIČA ZA PAMĆENJE</p>
            <h2>Sveti Juraj koji je morao završiti u Rijeci</h2>
          </div>
          <div>
            <p>
              Na međunarodnom natjecanju u Padovi riječki su streličari među nagradama
              vidjeli statuu svetog Jurja na konju, namijenjenu najboljoj seniorskoj momčadi.
              Nakon što su doznali kojoj je kategoriji namijenjena, iz riječkih je redova
              stigla samouvjerena najava:
            </p>
            <blockquote>„Odlično, sutra Sv. Juraj nakon završetka turnira putuje u Rijeku.”</blockquote>
            <p>
              Momčad SK Rijeka sljedećeg je dana pobijedila, a statua je doista završila
              u klupskim prostorijama.
            </p>
          </div>
        </div>
      </section>

      <section id="vremenska-crta" className="history-section history-container">
        <p className="history-kicker">KLJUČNI DOGAĐAJI</p>
        <h2>Vremenska crta</h2>
        <div className="history-timeline">
          {timeline.map((item) => (
            <article key={`${item.year}-${item.title}`}>
              <div className="history-timeline-year">{item.year}</div>
              <div className="history-timeline-dot" aria-hidden="true" />
              <div className="history-timeline-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="history-section history-closing">
        <div className="history-container">
          <p className="history-kicker">POVIJEST SE NASTAVLJA</p>
          <h2>Nasljeđe koje pripada novim generacijama</h2>
          <p>
            Povijest Streličarskog kluba Rijeka nije samo popis rezultata, rekorda i medalja.
            To je priča o članovima koji su na Krnjevu učili koncentraciju, strpljenje i
            odgovornost, o trenerima koji su prenosili znanje te o generacijama koje su
            ime Rijeke predstavljale na domaćim i međunarodnim natjecanjima.
          </p>
          <p>
            Od prvih streličarskih koraka u okruženju Torpeda, preko osnivanja kluba 1974.
            i Zlatne generacije osamdesetih, do današnjih članova, klub ostaje mjesto ljudi
            povezanih istom strašću prema luku, strijeli i sportu.
          </p>
        </div>
      </section>
    </main>
  );
}
