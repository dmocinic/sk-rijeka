import React, { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import "./galerija.css";

const kategorije = [
  { id: "sve", naziv: "Sve fotografije" },
  { id: "povijest", naziv: "Povijest kluba" },
  { id: "treninzi", naziv: "Treninzi" },
  { id: "natjecanja", naziv: "Natjecanja" },
  { id: "dogadanja", naziv: "Klupska događanja" },
];

export default function Galerija() {
  const [fotografije, setFotografije] = useState([]);
  const [kategorija, setKategorija] = useState("sve");
  const [aktivna, setAktivna] = useState(null);
  const [greska, setGreska] = useState("");

  useEffect(() => {
    fetch("/gallery-manifest.json", { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error("Manifest galerije nije pronađen.");
        return response.json();
      })
      .then((data) => setFotografije(Array.isArray(data.photos) ? data.photos : []))
      .catch((error) => setGreska(error.message));
  }, []);

  const prikaz = useMemo(
    () => kategorija === "sve" ? fotografije : fotografije.filter((foto) => foto.kategorija === kategorija),
    [fotografije, kategorija]
  );

  const aktivniIndeks = aktivna ? prikaz.findIndex((foto) => foto.src === aktivna.src) : -1;
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
      <header className="gallery-hero"><div className="gallery-container"><p className="gallery-kicker">STRELIČARSKI KLUB RIJEKA</p><h1>Galerija</h1><p>Fotografije iz povijesti kluba, s treninga, natjecanja i klupskih događanja.</p></div></header>
      <section className="gallery-section gallery-container">
        <div className="gallery-intro"><div><p className="gallery-kicker">KLUPSKA FOTOTEKA</p><h2>Trenuci koji čuvaju priču kluba</h2></div></div>
        <div className="gallery-filters">{kategorije.map((stavka) => <button key={stavka.id} className={kategorija === stavka.id ? "active" : ""} onClick={() => { setKategorija(stavka.id); setAktivna(null); }}>{stavka.naziv}</button>)}</div>

        {greska && <div className="gallery-empty"><ImageIcon/><h3>Galerija nije učitana</h3><p>{greska}</p></div>}
        {!greska && prikaz.length > 0 && <div className="gallery-grid">{prikaz.map((foto, indeks) => <button className={`gallery-item gallery-${foto.format}`} key={foto.src} onClick={() => setAktivna(foto)}><img src={foto.src} alt={foto.opis} loading={indeks < 3 ? "eager" : "lazy"}/><span className="gallery-overlay"><span className="gallery-category">{foto.kategorijaNaziv}</span><strong>{foto.naslov}</strong><small>{foto.opis}</small></span></button>)}</div>}
        {!greska && prikaz.length === 0 && <div className="gallery-empty"><ImageIcon/><h3>Fotografije uskoro</h3><p>U ovu kategoriju još nisu dodane fotografije.</p></div>}
      </section>
      {aktivna && <div className="gallery-lightbox" role="dialog" aria-modal="true" onClick={() => setAktivna(null)}><button className="gallery-close" onClick={() => setAktivna(null)}><X/></button>{prikaz.length > 1 && <button className="gallery-prev" onClick={(e) => { e.stopPropagation(); promijeni(-1); }}><ChevronLeft/></button>}<figure onClick={(e) => e.stopPropagation()}><img src={aktivna.src} alt={aktivna.opis}/><figcaption><strong>{aktivna.naslov}</strong><span>{aktivna.opis}</span></figcaption></figure>{prikaz.length > 1 && <button className="gallery-next" onClick={(e) => { e.stopPropagation(); promijeni(1); }}><ChevronRight/></button>}</div>}
    </main>
  );
}
