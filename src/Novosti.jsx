import React,{useEffect,useMemo,useState}from"react";
import{ArrowLeft,CalendarDays,Image as ImageIcon,Newspaper,Search}from"lucide-react";
import"./novosti.css";

const dt=d=>new Intl.DateTimeFormat("hr-HR",{day:"2-digit",month:"long",year:"numeric"}).format(new Date(d));
const slugFromHash=()=>{const match=window.location.hash.match(/^#\/novosti\/([^/?#]+)/);return match?decodeURIComponent(match[1]):null};

export default function Novosti(){
  const[a,setA]=useState([]),[c,setC]=useState("Sve"),[q,setQ]=useState(""),[sel,setSel]=useState(null),[status,setStatus]=useState("Učitavanje…");

  useEffect(()=>{
    const slug=slugFromHash();
    const url=slug?`/api/news/${encodeURIComponent(slug)}`:"/api/news";
    fetch(url).then(r=>r.json()).then(x=>{
      if(!x.ok)throw Error(x.message);
      if(slug){setSel(x.article);setA([])}else{setA(x.articles);setSel(null)}
      setStatus("");
    }).catch(e=>setStatus(e.message));
  },[]);

  const cats=[...new Set(a.map(x=>x.kategorija))];
  const show=useMemo(()=>a.filter(x=>(c==="Sve"||x.kategorija===c)&&`${x.naslov} ${x.sazetak} ${x.tekst.join(" ")}`.toLowerCase().includes(q.toLowerCase())),[a,c,q]);

  const openArticle=x=>{setSel(x);window.history.replaceState(null,"",`#/novosti/${encodeURIComponent(x.slug)}`);window.scrollTo({top:0,behavior:"smooth"})};
  const closeArticle=()=>{setSel(null);window.history.replaceState(null,"","#/novosti");if(!a.length){setStatus("Učitavanje…");fetch("/api/news").then(r=>r.json()).then(x=>{if(!x.ok)throw Error(x.message);setA(x.articles);setStatus("")}).catch(e=>setStatus(e.message))}};

  if(sel)return <main className="news-page"><article className="news-detail news-container"><button className="news-back" onClick={closeArticle}><ArrowLeft/>Sve novosti</button><div className="news-meta"><span>{sel.kategorija}</span><time>{dt(sel.datum)}</time></div><h1>{sel.naslov}</h1>{sel.slika&&<img src={sel.slika} alt={sel.slikaAlt}/>}<p className="news-lead">{sel.sazetak}</p>{sel.tekst.map((p,i)=><p key={i}>{p}</p>)}</article></main>;

  return <main className="news-page"><header className="news-hero"><div className="news-container"><h1>Novosti</h1><p>Natjecanja, rezultati, treninzi i klupske aktivnosti.</p></div></header><section className="news-section news-container"><div className="news-tools"><div className="news-search"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pretraži novosti"/></div><div className="news-filters"><button onClick={()=>setC("Sve")} className={c==="Sve"?"active":""}>Sve</button>{cats.map(x=><button key={x} onClick={()=>setC(x)} className={c===x?"active":""}>{x}</button>)}</div></div>{status&&<div className="news-empty"><Newspaper/><p>{status}</p></div>}<div className="news-grid">{show.map(x=><article className={x.istaknuto?"news-card featured":"news-card"} key={x.id}><button onClick={()=>openArticle(x)}><div className="news-image">{x.slika?<img src={x.slika} alt={x.slikaAlt}/>:<ImageIcon/>}</div><div className="news-copy"><div className="news-meta"><span>{x.kategorija}</span><time><CalendarDays/>{dt(x.datum)}</time></div><h2>{x.naslov}</h2><p>{x.sazetak}</p><strong>Pročitaj više →</strong></div></button></article>)}</div></section></main>
}
