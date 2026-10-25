import React,{useEffect,useRef,useState}from"react";
import{ChevronLeft,ChevronRight}from"lucide-react";
import"./najnovije-novosti.css";
const DEFAULT_NEWS_IMAGE="/images/novosti/default-novost.webp";
export default function NajnovijeNovosti(){
  const[i,setI]=useState([]),r=useRef(null);
  useEffect(()=>{fetch("/api/news?limit=8").then(x=>x.json()).then(x=>x.ok&&setI(x.articles)).catch(()=>{})},[]);
  if(!i.length)return null;
  const move=d=>r.current?.scrollBy({left:d*r.current.clientWidth*.85,behavior:"smooth"});
  return <section className="latest-news"><div className="latest-shell"><div className="latest-head"><div><span>AKTUALNO</span><h2>Najnovije vijesti</h2></div><div><button onClick={()=>move(-1)}><ChevronLeft/></button><button onClick={()=>move(1)}><ChevronRight/></button></div></div><div className="latest-rail" ref={r}>{i.map(x=><a href={`#/novosti/${x.slug}`} className="latest-card" key={x.id}><img src={x.slika||DEFAULT_NEWS_IMAGE} alt={x.slika?x.slikaAlt:"Streličarski klub Rijeka"}/><div><small>{x.kategorija} · {new Date(x.datum).toLocaleDateString("hr-HR")}</small><h3>{x.naslov}</h3><p>{x.sazetak}</p></div></a>)}</div></div></section>
}
