import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export type OrderLink = (subject: string) => string;

export function Photo({ image, alt, priority = false, className = "" }: {
  image: string; alt: string; priority?: boolean; className?: string;
}) {
  const file = ["hero", "macro", "nigiri", "temaki", "platter", "sashimi", "gunkan", "grilled", "chopsticks"].includes(image)
    ? `/images/editorial-${image}.webp` : `/images/${image}.webp`;
  return <span className={`photo ${className}`}><img src={file} alt={alt} loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"} decoding="async" /></span>;
}

export const gallery = [
  { image: "nigiri", name: "Nigiri de salmão" }, { image: "temaki", name: "Temaki de salmão" },
  { image: "platter", name: "Combinado da casa" }, { image: "sashimi", name: "Sashimi de salmão" },
  { image: "gunkan", name: "Gunkan" }, { image: "grilled", name: "Salmão maçaricado" },
  { image: "macro", name: "Uramaki" }, { image: "chopsticks", name: "Sushi artesanal" },
];

const featured = [
  { slug: "sushis", name: "Sushis", image: "nigiri" },
  { slug: "temakis", name: "Temakis", image: "temaki" },
  { slug: "combos", name: "Combos", image: "platter" },
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
