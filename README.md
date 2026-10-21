# Automatsko slanje prijave e-mailom

## Datoteke

- `src/ProbniTrening.jsx`
- `src/probni-trening.css`
- `functions/api/probni-trening.js`

Cloudflare Pages automatski objavljuje datoteke iz mape `functions` kao Pages Functions. Endpoint obrasca je `/api/probni-trening`.

## Resend postavljanje

1. Otvorite Resend račun.
2. U Resendu dodajte i verificirajte domenu `sk-rijeka.hr` prema DNS zapisima koje Resend prikaže.
3. U Resendu izradite API ključ.
4. U Cloudflare projektu `sk-rijeka` otvorite Settings > Environment variables and secrets.
5. Dodajte tajnu `RESEND_API_KEY` i kao vrijednost unesite Resend API ključ.
6. Pokrenite novi deployment na grani na kojoj testirate.

Funkcija šalje s adrese `prijave@sk-rijeka.hr` na `strelicarski.klub.rijeka@gmail.com`, a Reply-To postavlja na adresu osobe koja se prijavila.

## Važno

- API ključ nikada ne unosite u React datoteke niti u GitHub.
- Prije javne objave dovršite Politiku privatnosti.
- Preporučljivo je naknadno dodati Cloudflare Turnstile radi dodatne zaštite od automatiziranih prijava.
