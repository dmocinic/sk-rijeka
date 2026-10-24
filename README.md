# SEO paket SK Rijeka

## Datoteke
- `index.html` zamjenjuje postojeći korijenski index
- sadržaj mape `public/` dodajte u postojeću `public/` mapu

## Paket uključuje
- title i meta description
- canonical URL `https://sk-rijeka.hr/`
- Open Graph i Twitter Card podatke
- strukturirane podatke SportsOrganization
- favicon i web manifest reference
- robots.txt
- sitemap.xml
- Open Graph sliku 1200x630

## Važna napomena o trenutačnim hash rutama
Web koristi rute poput `#/novosti` i `#/treninzi`. Dio nakon znaka `#` ne šalje se poslužitelju kao zaseban URL. Zato sitemap namjerno sadrži samo kanonsku početnu adresu. Za zasebno indeksiranje svake stranice u budućnosti treba prijeći na stvarne URL rute, npr. `/novosti`, `/treninzi` i `/rezultati`.

## Nakon produkcije
1. otvorite `https://sk-rijeka.hr/robots.txt`
2. otvorite `https://sk-rijeka.hr/sitemap.xml`
3. provjerite prikaz dijeljenja početne stranice
4. dodajte domenu u Google Search Console i pošaljite sitemap
