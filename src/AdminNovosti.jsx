import React, { useEffect, useRef, useState } from "react";
import "./admin-novosti.css";

const SITE_KEY = "0x4AAAAAAFgYW5NH5srscdF3";
const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const localDate = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); };
const blankForm = () => ({ naslov:"",sazetak:"",tekst:"",kategorija:"Klupske aktivnosti",datum:localDate(),nazivSlike:"",slikaAlt:"",istaknuto:false,objavljeno:false });

function loadTurnstile() {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (existing) { existing.addEventListener("load", () => resolve(window.turnstile), { once:true }); existing.addEventListener("error", reject, { once:true }); return; }
    const script = document.createElement("script"); script.src = SCRIPT_URL; script.async = true; script.defer = true;
    script.onload = () => resolve(window.turnstile); script.onerror = reject; document.head.appendChild(script);
  });
}

async function apiRequest(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal, credentials: "same-origin" });
    const type = response.headers.get("content-type") || "";
    if (!type.includes("application/json")) throw new Error(`Poslužitelj nije vratio očekivani odgovor (HTTP ${response.status}).`);
    const data = await response.json();
    if (!response.ok || !data.ok) { const error = new Error(data.message || `Zahtjev nije uspio (HTTP ${response.status}).`); error.status = response.status; throw error; }
    return data;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("Zahtjev je trajao predugo. Pokušajte ponovno.");
    if (error instanceof TypeError) throw new Error("Nije moguće povezati se s administratorskim API-jem.");
    throw error;
  } finally { clearTimeout(timeout); }
}

function AdminLogin({ onSuccess }) {
  const [password,setPassword]=useState(""); const [token,setToken]=useState(""); const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
  const container=useRef(null),widget=useRef(null);
  useEffect(()=>{let active=true;loadTurnstile().then(t=>{if(active&&container.current&&widget.current===null)widget.current=t.render(container.current,{sitekey:SITE_KEY,action:"admin_login",theme:"auto",size:"flexible",callback:setToken,"expired-callback":()=>setToken(""),"error-callback":()=>setMessage("Sigurnosna provjera nije uspjela.")})}).catch(()=>setMessage("Sigurnosna provjera nije učitana."));return()=>{active=false;if(window.turnstile&&widget.current!==null)window.turnstile.remove(widget.current)}},[]);
  const submit=async e=>{e.preventDefault();if(!token)return setMessage("Dovršite sigurnosnu provjeru.");setBusy(true);setMessage("Prijava…");try{await apiRequest("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password,turnstileToken:token})});onSuccess()}catch(err){setMessage(err.message);setToken("");if(window.turnstile&&widget.current!==null)window.turnstile.reset(widget.current)}finally{setBusy(false)}};
  return <main className="admin-news"><div className="admin-login"><h1>Administracija novosti</h1><p>Prijavite se administratorskom lozinkom.</p><form onSubmit={submit}><label>Lozinka<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required disabled={busy}/></label><div className="admin-turnstile" ref={container}/><button disabled={busy||!token}>{busy?"Prijava…":"Prijavi se"}</button>{message&&<p className="admin-message error" role="status">{message}</p>}</form></div></main>;
}

export default function AdminNovosti(){
  const[authenticated,setAuthenticated]=useState(null),[items,setItems]=useState([]),[form,setForm]=useState(blankForm()),[editId,setEditId]=useState(null),[message,setMessage]=useState(""),[messageType,setMessageType]=useState(""),[loading,setLoading]=useState(false),[saving,setSaving]=useState(false);
  const show=(text,type="error")=>{setMessage(text);setMessageType(type)};
  const session=async()=>{try{const x=await apiRequest("/api/admin/session");setAuthenticated(x.authenticated);if(x.authenticated)await load()}catch{setAuthenticated(false)}};
  useEffect(()=>{session()},[]);
  const load=async()=>{setLoading(true);try{const x=await apiRequest("/api/admin/news");setItems(x.articles||[])}catch(e){if(e.status===401)setAuthenticated(false);else show(e.message)}finally{setLoading(false)}};
  const change=e=>setForm({...form,[e.target.name]:e.target.type==="checkbox"?e.target.checked:e.target.value});
  const edit=x=>{setEditId(x.id);setForm({naslov:x.naslov,sazetak:x.sazetak,tekst:x.tekst.join("\n\n"),kategorija:x.kategorija,datum:x.datum?.slice(0,16)||"",nazivSlike:x.nazivSlike||"",slikaAlt:x.slikaAlt||"",istaknuto:x.istaknuto,objavljeno:x.objavljeno});window.scrollTo({top:0,behavior:"smooth"})};
  const save=async e=>{e.preventDefault();setSaving(true);show("Spremanje…","info");try{await apiRequest(editId?`/api/admin/news/${editId}`:"/api/admin/news",{method:editId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});setForm(blankForm());setEditId(null);await load();show("Vijest je uspješno spremljena.","success")}catch(err){if(err.status===401)setAuthenticated(false);else show(err.message)}finally{setSaving(false)}};
  const remove=async id=>{if(!confirm("Obrisati vijest?"))return;try{await apiRequest(`/api/admin/news/${id}`,{method:"DELETE"});await load();show("Vijest je obrisana.","success")}catch(err){if(err.status===401)setAuthenticated(false);else show(err.message)}};
  const logout=async()=>{try{await apiRequest("/api/admin/logout",{method:"POST"})}finally{setAuthenticated(false);setItems([])}};
  if(authenticated===null)return <main className="admin-news"><div className="admin-login"><p>Provjera prijave…</p></div></main>;
  if(!authenticated)return <AdminLogin onSuccess={()=>{setAuthenticated(true);load()}}/>;
  return <main className="admin-news"><div className="admin-shell"><div className="admin-header"><h1>Upravljanje novostima</h1><button className="secondary" onClick={logout}>Odjava</button></div><p className="admin-info">Fotografiju prvo postavite u <code>public/images/novosti/</code>, zatim unesite samo naziv datoteke.</p><form onSubmit={save}><label>Naslov<input required name="naslov" value={form.naslov} onChange={change} disabled={saving}/></label><label>Sažetak<textarea required name="sazetak" value={form.sazetak} onChange={change} disabled={saving}/></label><label>Tekst<textarea required rows="10" name="tekst" value={form.tekst} onChange={change} disabled={saving}/></label><div className="admin-cols"><label>Kategorija<select name="kategorija" value={form.kategorija} onChange={change}><option>Natjecanja</option><option>Rezultati</option><option>Treninzi</option><option>Klupske aktivnosti</option></select></label><label>Datum<input type="datetime-local" name="datum" value={form.datum} onChange={change}/></label></div><label>Naziv fotografije<input name="nazivSlike" value={form.nazivSlike} onChange={change} placeholder="2026-10-22-prvenstvo.jpg"/></label><label>Opis fotografije<input name="slikaAlt" value={form.slikaAlt} onChange={change}/></label><div className="admin-checks"><label><input type="checkbox" name="istaknuto" checked={form.istaknuto} onChange={change}/>Istaknuta</label><label><input type="checkbox" name="objavljeno" checked={form.objavljeno} onChange={change}/>Objavljeno</label></div><button disabled={saving}>{saving?"Spremanje…":editId?"Spremi izmjene":"Dodaj vijest"}</button>{editId&&<button type="button" className="secondary" onClick={()=>{setEditId(null);setForm(blankForm())}}>Odustani</button>}{message&&<p className={`admin-message ${messageType}`} role="status">{message}</p>}</form><section><div className="admin-list-heading"><h2>Postojeće vijesti</h2><button className="secondary" onClick={load} disabled={loading}>{loading?"Učitavanje…":"Osvježi"}</button></div>{items.map(x=><article key={x.id}><div><strong>{x.naslov}</strong><span>{x.kategorija} · {x.objavljeno?"Objavljeno":"Nacrt"}</span></div><div><button onClick={()=>edit(x)}>Uredi</button><button onClick={()=>remove(x.id)}>Obriši</button></div></article>)}</section></div></main>;
}
