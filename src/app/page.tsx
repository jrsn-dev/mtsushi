
import Hero from "../components/home/Hero";
import Preloader from "../components/home/Preloader";
import SushiRail from "../components/home/SushiRail";
import Ticker from "../components/home/Ticker";
import { categories, formatPrice, menuNotes } from "../components/cardapio.js";

const logo = "/images/mt-sushi-logo.svg";
const categoryUrl = (slug: string) => "/cardapio?categoria=" + encodeURIComponent(slug);
const instagram = "https://www.instagram.com/mtsushiarte/";

export default function Home() {
  const configured = (process.env.NEXT_PUBLIC_WHATSAPP || process.env.VITE_WHATSAPP || "").trim();
  const phone = /^55\d{10,11}$/.test(configured) ? configured : "5543999268358";
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK || "";
  const combos = categories.find(group => group.slug === "combos")!;
  const featured = combos.items[0];

  return <>
    <link rel="stylesheet" href="/assets/css/style.css" />
    <link rel="stylesheet" href="/assets/css/improvements.css" />
    <noscript><style>{".preloader{display:none!important}.hero__title .line>span,.hero-fade,[data-reveal]{opacity:1!important;transform:none!important}"}</style></noscript>
    <a className="skip-link" href="#inicio">Pular para o conteúdo</a>
    <Preloader />
    <div className="noise" aria-hidden="true" />
    <div className="page-progress" aria-hidden="true"><span className="page-progress__bar" /></div>
    <header className="navbar" id="navbar">
      <a className="brand" href="#inicio"><img src={logo} width="150" height="42" alt="MT Sushi Arte" /></a>
      <nav className="nav-links" aria-label="Navegação principal"><a className="nav-link" href="#inicio">Início</a><a className="nav-link" href="#cardapio">Cardápio</a><a className="nav-link" href="#combos">Combinados</a><a className="nav-link" href="#delivery">Delivery</a></nav>
      <a className="btn btn--red btn--sm" href="/cardapio">Fazer pedido</a>
    </header>
    <SushiRail />
    <main className="site"><Hero /><Ticker />
      <section className="section categories" id="cardapio"><div className="section__inner">
        <div className="section-head"><div><p className="eyebrow">Cardápio</p><h2>Escolha seu <em>ritual.</em></h2></div><a className="link-arrow" href="/cardapio">Ver cardápio completo →</a></div>
        <div className="cat-grid">{categories.map(group => <a className="cat-card" key={group.slug} href={categoryUrl(group.slug)}>
          <img className="category-photo" src={`/images/cardapio/${group.items[0].image}.webp`} loading="lazy" alt="" />
          <span className="cat-card__title">{group.name}</span><span className="cat-card__sub">{group.items.length} opções</span>
        </a>)}</div>
      </div></section>
      <section className="section combos" id="combos"><div className="section__inner"><div className="section-head"><h2>Combos <em>especiais.</em></h2></div>
        <article className="combo-feature"><div className="combo-feature__media"><img className="parallax-img" src={`/images/cardapio/${featured.image}.webp`} alt={featured.name} loading="lazy" /></div>
        <div className="combo-feature__body"><p className="eyebrow">{combos.name}</p><h3>{featured.name}</h3><p>{featured.detail}</p><p>{featured.portion}</p><div className="combo-feature__foot"><strong className="price">{formatPrice(featured.price)}</strong><a className="btn btn--red" href={categoryUrl(combos.slug)}>Ver combinados</a></div></div></article>
      </div></section>
      <section className="section about" id="arte"><div className="section__inner about__inner"><div className="about__visual"><img src="/images/editorial-macro.webp" alt="Detalhe do sushi artesanal" loading="lazy" /></div><div className="about__copy"><p className="eyebrow">Nossa arte</p><h2>Arte em cada <em>peça.</em></h2><p>Salmão fresco, arroz com vinagre de arroz, nori crocante e gergelim tostado.</p>{menuNotes.map(note => <p key={note}>{note}</p>)}</div></div></section>
      <section className="section delivery" id="delivery"><div className="section__inner"><div className="delivery__card"><div><p className="eyebrow">Jacarezinho, PR</p><h2>Peça no nosso <em>delivery.</em></h2><p>Segunda a sexta, das 18h às 23h.</p><a href="/cardapio" className="btn btn--red">Montar meu pedido</a></div></div></div></section>
      <footer className="footer" id="contato"><div className="section__inner"><a href="#inicio"><img src={logo} width="150" alt="MT Sushi Arte" /></a><nav className="home-contacts" aria-label="Contato"><a href={`https://wa.me/${phone}`}>WhatsApp</a><a href={instagram}>Instagram</a>{/^https:\/\/(www\.)?facebook\.com\/.+/i.test(facebook) && <a href={facebook}>Facebook</a>}</nav><a className="home-credit" href="https://fluidy.site">Desenvolvido por <img src="/images/fluidy-logo.svg" width="66" alt="Fluidy" /></a></div></footer>
    </main>
    <script src="/assets/js/home-motion.js" defer />
  </>;
}
