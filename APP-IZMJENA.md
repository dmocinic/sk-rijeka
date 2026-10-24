# Izmjena App.jsx

U `src/App.jsx` generičku ikonu mete u brandu zamijenite službenim logom.

## Prije

```jsx
<a className="app-brand" href="#/pocetna">
  <span className="app-brand-mark"><Target/></span>
  <span><strong>Streličarski klub Rijeka</strong><small>Rijeka, Hrvatska</small></span>
</a>
```

## Poslije

```jsx
<a className="app-brand" href="#/pocetna">
  <img
    className="app-brand-logo"
    src="/images/logo/sk-rijeka-logo.png"
    alt="Streličarski klub Rijeka"
  />
  <span><strong>Streličarski klub Rijeka</strong><small>Rijeka, Hrvatska</small></span>
</a>
```

U `src/App.jsx` dodajte odmah nakon postojećeg `import "./app.css";`:

```jsx
import "./logo.css";
```

Ikona `Target` više nije potrebna za zaglavlje. Ako se nigdje drugdje ne koristi, može se ukloniti iz `lucide-react` importa.
