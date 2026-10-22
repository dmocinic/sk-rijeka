import React, { useEffect, useMemo, useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import "./galerija.css";

const kategorije = [
  { id: "sve", naziv: "Sve fotografije" },
  { id: "povijest", naziv: "Povijest kluba" },
  { id: "treninzi", naziv: "Treninzi" },
  { id: "natjecanja", naziv: "Natjecanja" },
  { id: "dogadanja", naziv: "Klupska događanja" },
];

const fotografije = [
  {
    src: "/images/galerija/povijest/kronika-osnivanje.jpg",
    kategorija: "povijest",
    naslov: "Klupska kronika",
    opis: "Izvorni zapis iz klupske kronike o osnivanju Streličarskog kluba Rijeka.",
    format: "portrait",
  },
  {
    src: "/images/galerija/povijest/povijesno-okupljanje.jpg",
    kategorija: "povijest",
    naslov: "Povijesno okupljanje",
    opis: "Sudionici i uzvanici na jednom od povijesnih klupskih događaja.",
    format: "wide",
  },
  {
    src: "/images/galerija/povijest/natjecanje-stadion.png",
    kategorija: "povijest",
    naslov: "Natjecanje na stadionu",
    opis: "Arhivski prizor streličarskog borilišta s nizom meta.",
    format: "wide",
  },
  {
    src: "/images/galerija/povijest/skupna-fotografija.jpg",
    kategorija: "povijest",
    naslov: "Iz klupske fototeke",
    opis: "Skupna arhivska fotografija iz sačuvane klupske građe.",
    format: "standard",
  },
];

export default function Galerija() {
  const [kategorija, setKategorija] = useState("sve");
  const [aktivna, setAktivna] = useState(null);

  const prikaz = useMemo(
    () => kategorija === "sve" ? fotografije : fotografije.filter((f) => f.kategorija === kategorija),
    [kategorija]
  );

  const praznaKategorija = kategorija !== "sve" && prikaz.length === 0;
  const aktivniIndeks = aktivna ? prikaz.findIndex((f) => f.src === aktivna.src) : -1;

  const promijeni = (pomak) => {
    if (!prikaz.length) return;
    const novi = (aktivniIndeks + pomak + prikaz.length) % prikaz.length;
    setAktivna(prikaz[novi]);
  };

  useEffect(() => {
    const tipka = (event) => {
      if (!aktivna) return;
      if (event.key === "Escape") setAktivna(null);
      if (event.key === "ArrowLeft") promijeni(-1);
      if (event.key === "ArrowRight") promijeni(1);
    };
    window.addEventListener("keydown", tipka);
    return () => window.removeEventListener("keydown", tipka);
  });

  return (
    <main className="gallery-page">
      <header className="gallery-hero">
        <div className="gallery-container">
          <p className="gallery-kicker">STRELIČARSKI KLUB RIJEKA</p>
          <h1>Galerija</h1>
          <p>Fotografije iz povijesti kluba, s treninga, natjecanja i klupskih događanja.</p>
        </div>
      </header>

      <section className="gallery-section gallery-container">
        <div className="gallery-intro">
          <div>
            <p className="gallery-kicker">KLUPSKA FOTOTEKA</p>
            <h2>Trenuci koji čuvaju priču kluba</h2>
          </div>
          <p>Galerija je organizirana po kategorijama. Nove fotografije mogu se naknadno dodavati u odgovarajuće mape unutar <code>public/images/galerija</code>.</p>
        </div>

        <div className="gallery-filters" aria-label="Kategorije galerije">
          {kategorije.map((stavka) => (
            <button
              key={stavka.id}
              className={kategorija === stavka.id ? "active" : ""}
              onClick={() => { setKategorija(stavka.id); setAktivna(null); }}
            >
              {stavka.naziv}
            </button>
          ))}
        </div>

        {!praznaKategorija && (
          <div className="gallery-grid">
            {prikaz.map((foto, indeks) => (
              <button
                className={`gallery-item gallery-${foto.format}`}
                key={foto.src}
                onClick={() => setAktivna(foto)}
                aria-label={`Otvori fotografiju: ${foto.naslov}`}
              >
                <img src={foto.src} alt={foto.opis} loading={indeks < 3 ? "eager" : "lazy"} />
                <span className="gallery-overlay">
                  <span className="gallery-category">{kategorije.find((k) => k.id === foto.kategorija)?.naziv}</span>
                  <strong>{foto.naslov}</strong>
                  <small>{foto.opis}</small>
                </span>
              </button>
            ))}
          </div>
        )}

        {praznaKategorija && (
          <div className="gallery-empty">
            <span><ImageIcon /></span>
            <h3>Fotografije uskoro</h3>
            <p>Za ovu kategoriju još nisu dodane fotografije. Struktura mape već je pripremljena za buduće slike.</p>
          </div>
        )}
      </section>

      <section className="gallery-guide">
        <div className="gallery-container">
          <Camera />
          <div>
            <h2>Kako dodavati nove fotografije</h2>
            <p>Fotografiju prvo spremite u mapu odgovarajuće kategorije, a zatim dodajte jedan zapis u polje <code>fotografije</code> unutar datoteke <code>Galerija.jsx</code>.</p>
          </div>
        </div>
      </section>

      {aktivna && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={aktivna.naslov} onClick={() => setAktivna(null)}>
          <button className="gallery-close" onClick={() => setAktivna(null)} aria-label="Zatvori"><X /></button>
          {prikaz.length > 1 && <button className="gallery-prev" onClick={(e) => { e.stopPropagation(); promijeni(-1); }} aria-label="Prethodna fotografija"><ChevronLeft /></button>}
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={aktivna.src} alt={aktivna.opis} />
            <figcaption><strong>{aktivna.naslov}</strong><span>{aktivna.opis}</span></figcaption>
          </figure>
          {prikaz.length > 1 && <button className="gallery-next" onClick={(e) => { e.stopPropagation(); promijeni(1); }} aria-label="Sljedeća fotografija"><ChevronRight /></button>}
        </div>
      )}
    </main>
  );
}
