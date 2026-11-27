"use client";

import AddButton from "@/components/AddButton";
import { useStore } from "@/components/StoreProvider";
import { site } from "@/lib/site";
import { brl, dishes, menuFilters } from "@/lib/menu";



export default function MenuSection() {
  const { filter, setFilter } = useStore();

  return (
    <section className="section menu" id="menu">
      <div className="section__inner">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">
              <span className="eyebrow__line" />
              Do nosso balcão
            </p>
            <h2 data-split>
              Assinaturas <em>MTSUSHI</em>
            </h2>
          </div>
          <p className="section-head__note">
            Peças que contam a nossa história. Escolha as suas favoritas — ou deixe o
            chef decidir por você.
          </p>
        </div>

        <div className="menu-filters" data-reveal aria-label="Filtrar cardápio">
          {menuFilters.map((item) => {
            const active = filter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`filter${active ? " is-active" : ""}`}
                aria-pressed={active}
                onClick={() => setFilter(item.key)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="menu-grid" id="menuGrid">
          {dishes.map((dish) => {
            const visible = filter === "todos" || filter === dish.filter;
            return (
              <article
                className={`dish${visible ? "" : " is-filtered-out"}`}
                data-cat={dish.filter}
                data-item-id={dish.id}
                data-reveal
                key={dish.id}
              >
                <div className={dish.tone ? `dish__media dish__media--${dish.tone}` : "dish__media"}>
                  {dish.badge ? <span className="dish__badge">{dish.badge}</span> : null}
                  <img
                    src={dish.img}
                    width={dish.width}
                    height={dish.height}
                    alt={dish.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="dish__body">
                  <div className="dish__top">
                    <h3>{dish.name}</h3>
                    <span className="dish__price">{brl(dish.price)}</span>
                  </div>
                  <p>{dish.desc}</p>
                  <AddButton
                    className="dish__add"
                    item={{
                      id: dish.id,
                      name: dish.name,
                      price: dish.price,
                      img: dish.img,
                      cat: dish.cat,
                    }}
                  >
                    <span>+</span> Adicionar
                  </AddButton>
                </div>
              </article>
            );
          })}
        </div>

        <div className="menu-foot" data-reveal>
          <p>
            <span>Não encontrou o que procura?</span> Monte seu combo com o chef.
          </p>
          <a
            className="link-arrow"
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
              "Olá! Quero montar um combo personalizado no MTSUSHI ARTE."
            )}`}
            target="_blank"
            rel="noopener"
          >
            Falar com o chef <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
