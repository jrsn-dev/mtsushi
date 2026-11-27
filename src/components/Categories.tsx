import { Fish, Soup, CircleDot, Sparkles, Flame, Circle, Cone, Layers3, IceCreamBowl, Sun } from "lucide-react";
import { categories } from "@/lib/menu";

const icons: Record<string, typeof Fish> = {
  entradas: Soup, uramakis: CircleDot, "uramakis-premium": Sparkles, "hot-rolls": Flame,
  hossomakis: Circle, temakis: Cone, jyos: Fish, combos: Layers3, sobremesas: IceCreamBowl, domingo: Sun,
};

export default function Categories() {
  return (
    <section className="section categories" id="cardapio">
      <div className="section__inner">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">
              <span className="eyebrow__line" />
              Navegue pelo menu
            </p>
            <h2 data-split>
              Escolha seu <em>ritual</em>
            </h2>
          </div>
          <p className="section-head__note">
            Do clássico ao autoral. Tudo é preparado na hora, com o cuidado de quem
            trata sushi como arte.
          </p>
        </div>

        <div className="cat-grid" data-reveal-group>
          {categories.map((category) => {
            const Icon = icons[category.filter] ?? Fish;
            return (
            <a key={category.filter} className="cat-card" href={`/cardapio?categoria=${category.filter}`}>
              <span className="cat-card__icon"><Icon aria-hidden="true" strokeWidth={1.5} /></span>
              <span className="cat-card__title">{category.title}</span>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
