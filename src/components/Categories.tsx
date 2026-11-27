import { CategoryIcon } from "./CategoryIcon";
import { categories } from "@/lib/menu";

export default function Categories() {
  return (
    <section className="section categories" id="cardapio">
      <div className="section__inner">
        <div className="section-head" data-reveal>
          <div>
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
            return (
            <a key={category.filter} className="cat-card" href={`/cardapio?categoria=${category.filter}`}>
              <span className="cat-card__icon"><CategoryIcon slug={category.filter} /></span>
              <span className="cat-card__title">{category.title}</span>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
