import React, { useEffect, useState } from "react";
import "./admin-novosti.css";

const localDate = () => {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const blankForm = () => ({
  naslov: "",
  sazetak: "",
  tekst: "",
  kategorija: "Klupske aktivnosti",
  datum: localDate(),
  nazivSlike: "",
  slikaAlt: "",
  istaknuto: false,
  objavljeno: false,
});

async function readJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();
    const isBlockedPage = /suspicious|nedostupna|blocked|access denied|zabranjen/i.test(text);

    if (isBlockedPage) {
      throw new Error("Mrežna zaštita blokirala je pristup administratorskom API-ju. Pokušajte s druge mreže ili zatražite dopuštenje za Preview domenu.");
    }

    throw new Error(`Poslužitelj nije vratio očekivani JSON odgovor (HTTP ${response.status}).`);
  }

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.message || `Zahtjev nije uspio (HTTP ${response.status}).`);
  }

  return data;
}

async function apiRequest(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return await readJsonResponse(response);
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Zahtjev je trajao predugo. Provjerite mrežnu vezu i pokušajte ponovno.");
    }
    if (error instanceof TypeError) {
      throw new Error("Nije moguće povezati se s administratorskim API-jem. Provjerite mrežni pristup Preview domeni.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export default function AdminNovosti() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blankForm());
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const showMessage = (text, type = "error") => {
    setMessage(text);
    setMessageType(type);
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/admin/news", {}, 12000);
      setItems(data.articles || []);
      setMessage("");
      setMessageType("");
    } catch (error) {
      showMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const change = (event) => setForm({
    ...form,
    [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
  });

  const edit = (article) => {
    setEditId(article.id);
    setForm({
      naslov: article.naslov,
      sazetak: article.sazetak,
      tekst: article.tekst.join("\n\n"),
      kategorija: article.kategorija,
      datum: article.datum?.slice(0, 16) || "",
      nazivSlike: article.nazivSlike || "",
      slikaAlt: article.slikaAlt || "",
      istaknuto: article.istaknuto,
      objavljeno: article.objavljeno,
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(blankForm());
    setMessage("");
  };

  const save = async (event) => {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    showMessage("Spremanje…", "info");

    try {
      await apiRequest(editId ? `/api/admin/news/${editId}` : "/api/admin/news", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm(blankForm());
      setEditId(null);
      showMessage("Vijest je uspješno spremljena.", "success");
      await load();
      showMessage("Vijest je uspješno spremljena.", "success");
    } catch (error) {
      showMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Obrisati vijest?")) return;
    setDeletingId(id);
    showMessage("Brisanje…", "info");

    try {
      await apiRequest(`/api/admin/news/${id}`, { method: "DELETE" });
      await load();
      showMessage("Vijest je obrisana.", "success");
    } catch (error) {
      showMessage(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="admin-news">
      <div className="admin-shell">
        <h1>Upravljanje novostima</h1>
        <p className="admin-info">Fotografiju prvo postavite u <code>public/images/novosti/</code>, zatim unesite samo naziv datoteke.</p>

        <form onSubmit={save}>
          <label>Naslov<input required name="naslov" value={form.naslov} onChange={change} disabled={saving} /></label>
          <label>Sažetak<textarea required name="sazetak" value={form.sazetak} onChange={change} disabled={saving} /></label>
          <label>Tekst<textarea required rows="10" name="tekst" value={form.tekst} onChange={change} disabled={saving} placeholder="Odlomke odvojite praznim retkom." /></label>
          <div className="admin-cols">
            <label>Kategorija<select name="kategorija" value={form.kategorija} onChange={change} disabled={saving}><option>Natjecanja</option><option>Rezultati</option><option>Treninzi</option><option>Klupske aktivnosti</option></select></label>
            <label>Datum<input type="datetime-local" name="datum" value={form.datum} onChange={change} disabled={saving} /></label>
          </div>
          <label>Naziv fotografije<input name="nazivSlike" value={form.nazivSlike} onChange={change} disabled={saving} placeholder="2026-10-22-prvenstvo.jpg" /></label>
          <label>Opis fotografije<input name="slikaAlt" value={form.slikaAlt} onChange={change} disabled={saving} /></label>
          <div className="admin-checks">
            <label><input type="checkbox" name="istaknuto" checked={form.istaknuto} onChange={change} disabled={saving} />Istaknuta</label>
            <label><input type="checkbox" name="objavljeno" checked={form.objavljeno} onChange={change} disabled={saving} />Objavljeno</label>
          </div>
          <button disabled={saving}>{saving ? "Spremanje…" : editId ? "Spremi izmjene" : "Dodaj vijest"}</button>
          {editId && <button type="button" className="secondary" onClick={cancelEdit} disabled={saving}>Odustani</button>}
          {message && <p className={`admin-message ${messageType}`} role="status" aria-live="polite">{message}</p>}
        </form>

        <section>
          <div className="admin-list-heading"><h2>Postojeće vijesti</h2><button type="button" className="secondary" onClick={load} disabled={loading || saving}>{loading ? "Učitavanje…" : "Osvježi"}</button></div>
          {!loading && items.length === 0 && <p>Nema spremljenih vijesti.</p>}
          {items.map((article) => <article key={article.id}><div><strong>{article.naslov}</strong><span>{article.kategorija} · {article.objavljeno ? "Objavljeno" : "Nacrt"}</span></div><div><button type="button" onClick={() => edit(article)} disabled={saving || deletingId === article.id}>Uredi</button><button type="button" onClick={() => remove(article.id)} disabled={saving || deletingId === article.id}>{deletingId === article.id ? "Brisanje…" : "Obriši"}</button></div></article>)}
        </section>
      </div>
    </main>
  );
}
