import React from "react";
import "./politika-privatnosti.css";

export default function PolitikaPrivatnosti() {
  return (
    <main className="privacy-page">
      <header className="privacy-hero">
        <div className="privacy-container">
          <p className="privacy-kicker">STRELIČARSKI KLUB RIJEKA</p>
          <h1>Politika privatnosti</h1>
          <p>Informacije o obradi osobnih podataka putem web-stranice sk-rijeka.hr.</p>
        </div>
      </header>

      <div className="privacy-container privacy-content">
        <section>
          <h2>1. Voditelj obrade</h2>
          <p><strong>Streličarski klub „Rijeka”</strong><br/>Ružićeva 7, 51000 Rijeka<br/>E-mail: <a href="mailto:strelicarski.klub.rijeka@gmail.com">strelicarski.klub.rijeka@gmail.com</a><br/>Telefon: <a href="tel:+385977733189">097 773 3189</a> · <a href="tel:+38598442264">098 442 264</a></p>
        </section>

        <section>
          <h2>2. Podaci koje prikupljamo putem obrasca</h2>
          <p>Putem obrasca „Prijavi se za probni trening” prikupljamo podatke koje osoba sama unese: ime i prezime, godinu rođenja, e-mail adresu, telefonski broj ako ga osoba navede, podatak o prethodnom iskustvu te sadržaj poruke ili napomene.</p>
        </section>

        <section>
          <h2>3. Svrha i pravna osnova</h2>
          <p>Podatke iz obrasca koristimo radi zaprimanja i obrade upita o probnom treningu i mogućem članstvu te radi odgovora i dogovora s osobom koja je poslala prijavu.</p>
          <p>Obrazac se šalje tek nakon što osoba označi privolu za korištenje navedenih podataka u tu svrhu. Privolu je moguće povući obraćanjem klubu na navedenu e-mail adresu. Povlačenje privole ne utječe na zakonitost obrade provedene prije povlačenja.</p>
        </section>

        <section>
          <h2>4. Kako se prijava obrađuje</h2>
          <p>Web-stranica prijavu prosljeđuje na službenu e-mail adresu kluba. Podaci iz obrasca ne spremaju se u posebnu bazu podataka ove web-stranice.</p>
          <p>Za objavu web-stranice i izvršavanje obrasca koristi se Cloudflare infrastruktura, a za tehničku isporuku poruke iz obrasca koristi se Resend.</p>
        </section>

        <section>
          <h2>5. Primatelji i pružatelji usluga</h2>
          <p>Podacima pristupaju ovlaštene osobe Streličarskog kluba Rijeka kojima je to potrebno radi odgovora na upit. U tehničkoj obradi sudjeluju pružatelji infrastrukture i slanja e-pošte koje klub koristi za rad web-stranice.</p>
          <p>Pružatelji tehničkih usluga mogu obrađivati tehničke podatke potrebne za pouzdan i siguran rad svojih usluga u skladu s vlastitim uvjetima i pravilima privatnosti.</p>
        </section>

        <section>
          <h2>6. Rok čuvanja</h2>
          <p>Podatke iz prijave čuvamo samo koliko je potrebno za odgovor, dogovor o probnom treningu i rješavanje povezanog upita. Ako nakon toga ne dođe do članstva ili druge osnove za daljnju obradu, podatke treba ukloniti kada više nisu potrebni za tu svrhu.</p>
        </section>

        <section>
          <h2>7. Vaša prava</h2>
          <p>U skladu s primjenjivim propisima o zaštiti osobnih podataka možete, kada su za to ispunjeni uvjeti, zatražiti pristup svojim podacima, njihov ispravak ili brisanje, ograničenje obrade, ostvariti pravo na prenosivost podataka ili uložiti prigovor.</p>
          <p>Ako se obrada temelji na privoli, privolu možete povući u bilo kojem trenutku. Za ostvarivanje prava obratite se na <a href="mailto:strelicarski.klub.rijeka@gmail.com">strelicarski.klub.rijeka@gmail.com</a>.</p>
          <p>Ako smatrate da se vaši osobni podaci obrađuju protivno propisima, imate pravo podnijeti pritužbu nadležnom nadzornom tijelu, Agenciji za zaštitu osobnih podataka (AZOP).</p>
        </section>

        <section>
          <h2>8. Obveznost podataka i automatizirano odlučivanje</h2>
          <p>Podaci označeni kao obvezni potrebni su kako bismo mogli identificirati upit i odgovoriti na prijavu. Telefonski broj je opcionalan. Ne provodimo automatizirano donošenje odluka niti profiliranje na temelju podataka iz obrasca.</p>
        </section>

        <section>
          <h2>9. Sigurnost</h2>
          <p>Primjenjujemo razumne tehničke i organizacijske mjere radi zaštite osobnih podataka. Tajni ključevi potrebni za slanje e-pošte ne pohranjuju se u javnom izvornom kodu web-stranice.</p>
        </section>

        <section>
          <h2>10. Vanjske poveznice</h2>
          <p>Web-stranica može sadržavati poveznice na vanjske stranice, primjerice Facebook. Nakon otvaranja takve poveznice obrada podataka odvija se prema pravilima privatnosti tog vanjskog pružatelja.</p>
        </section>

        <section>
          <h2>11. Promjene politike</h2>
          <p>Politiku privatnosti možemo ažurirati kada se promijene funkcionalnosti web-stranice, način obrade podataka ili primjenjivi zahtjevi. Na ovoj stranici bit će objavljena važeća verzija politike.</p>
        </section>
      </div>
    </main>
  );
}
