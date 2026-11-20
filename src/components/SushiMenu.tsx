import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export type OrderLink = (subject: string) => string;

export function Photo({ image, alt, priority = false, className = "" }: {
  image: string; alt: string; priority?: boolean; className?: string;
}) {
  const file = `/images/cardapio/${image}.webp`;
  return <span className={`photo ${className}`}><img src={file} alt={alt} loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"} decoding="async" /></span>;
}

export const gallery = [
  { image: "bandeja", name: "Seleção da casa" }, { image: "temakis-hd", name: "Temaki salmão" },
  { image: "supremo", name: "Combinado supremo" }, { image: "jyo-salmao", name: "Jyo salmão" },
  { image: "hot-roll-salmao", name: "Hot roll salmão" }, { image: "pecas", name: "Peças da casa" },
  { image: "uramakis-hd", name: "Uramaki Filadélfia especial" }, { image: "sobremesas-hd", name: "Hot roll morango c/ Nutella" },
];

const featured = [
  { slug: "uramakis", name: "Uramakis", image: "uramakis-hd" },
  { slug: "temakis", name: "Temakis", image: "temakis-hd" },
  { slug: "combos", name: "Combinados", image: "combinados-a" },
];
const more = [
  { slug: "entradas", name: "Entradas" },
  { slug: "sobremesas", name: "Sobremesas" },
];
export function SushiMenu() {
  return (
    <section className="shell section menu-section" id="cardapio" aria-labelledby="menu-title">
      <div className="menu-overview">
        <div className="section-heading">
          <h2 id="menu-title">Cardápio</h2>
          <Link className="button button-red" href="/cardapio">Abrir cardápio digital <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="menu-grid">
          {featured.map(({ name, image, slug }) => (
            <Link className="menu-card" key={slug} href={`/cardapio?categoria=${slug}`}>
              <Photo image={image} alt="" /><span className="menu-label">{name} <ArrowUpRight aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
        <div className="menu-chips">
          {more.map(({ name, slug }) => (
            <Link className="button button-outline" key={slug} href={`/cardapio?categoria=${slug}`}>
              {name} <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
