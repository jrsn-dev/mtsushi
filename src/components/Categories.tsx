"use client";

import { useStore } from "@/components/StoreProvider";
import { categories, type FilterKey } from "@/lib/menu";

const icons = [
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" key="combos">
    <rect x="7" y="9" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <rect x="5" y="15" width="22" height="5" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <rect x="9" y="21" width="14" height="5" rx="2" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" key="sushis">
    <path
      d="M7 19c3-3.6 7.6-5.2 12.8-4.3 3.1.5 5.2 2.2 4.7 4.1-.5 2-3.4 2.9-6.4 2.3-4.4-1-7.8-2.6-11.1-2.1Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="M8 22.5c4.6 1.4 10.8 1.2 16-1.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M19 14.8c1.6-1.7 3.2-2.4 4.8-2.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" key="makis">
    <ellipse cx="16" cy="13" rx="8.5" ry="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7.5 13v6c0 2.5 3.8 4.5 8.5 4.5s8.5-2 8.5-4.5v-6" stroke="currentColor" strokeWidth="1.4" />
    <ellipse cx="16" cy="13" rx="3.5" ry="1.8" stroke="currentColor" strokeWidth="1.2" />
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" key="temakis">
    <path
      d="M9 8.5c4.3-1.1 9.8-.9 14.3.6L17 26.2c-.4 1.1-1.6 1.1-2 0L9 8.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M10 11c4 1.2 8.2 1.3 12.4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M13.5 8.9c1.6 2 4.5 2.9 7.4 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" key="hotrolls">
    <path
      d="M16.5 5.5c.3 4.2-3.6 5.2-3.3 9.1.2 2 1.8 3.2 3.5 2.8 2.1-.5 2.8-2.8 1.8-4.8-.6-1.2-.2-2.2 1-2.8.8 2.2 2.5 3.4 3.3 5.8 1.2 3.6-.8 7.2-4.3 8.5-4.2 1.6-8.9-.6-9.8-4.8-1-4.6 2.6-7.4 4.2-10.4.8-1.6 1.5-3 1.6-3.4Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>,
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" key="sashimis">
    <path
      d="M5.5 17.5c4-3.5 9.2-4.8 15-3.4 2.9.7 4.8 2.4 4.2 4.4-.6 2.1-3.6 2.8-6.5 2.1-5-1.2-8.9-3.3-12.7-3.1Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="M9 20.8c3.8.7 8 .7 12.1-.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M8.5 25.5h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".55" />
  </svg>,
];

export default function Categories() {
  const { setFilter } = useStore();

  function go(category: (typeof categories)[number]) {
    const api = (window as unknown as { __mtsushi?: { scrollTo?: (t: string) => void } })
      .__mtsushi;
    if (category.jump === "combos") {
      api?.scrollTo?.("#combos");
      return;
    }
    if (category.filter) setFilter(category.filter as FilterKey);
    api?.scrollTo?.("#menu");
  }

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
          {categories.map((category, index) => (
            <button
              key={category.num}
              className="cat-card"
              type="button"
              onClick={() => go(category)}
            >
              <span className="cat-card__num">{category.num}</span>
              <span className="cat-card__icon">{icons[index % icons.length]}</span>
              <span className="cat-card__title">{category.title}</span>
              <span className="cat-card__sub">{category.sub}</span>
              <span className="cat-card__arrow">↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
