import { ArrowRight, Plus } from "lucide-react";
import AddButton from "@/components/AddButton";
import { brl, combos, featuredCombo } from "@/lib/menu";

export default function Combos() {
  return (
    <section className="section combos" id="combos">
      <div className="section__inner">
        <div className="section-head" data-reveal>
          <div>
            <h2 data-split>
              Combos <em>especiais</em>
            </h2>
          </div>
          <a className="link-arrow" href="/cardapio">
            Ver cardápio completo <span><ArrowRight aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} /></span>
          </a>
        </div>

        <article className="combo-feature" data-reveal data-item-id={featuredCombo.id}>
          <div className="combo-feature__media">
            <img
              className="parallax-img"
              src={featuredCombo.img}
              width={featuredCombo.width}
              height={featuredCombo.height}
              alt={featuredCombo.alt}
              loading="lazy"
              decoding="async"
            />
            <span className="combo-feature__pieces">Combinados</span>
          </div>
          <div className="combo-feature__body">
            <p className="combo-feature__kicker">Assinatura da casa</p>
            <h3>
              {featuredCombo.name}
            </h3>
            <p className="combo-feature__desc">
              {featuredCombo.desc}
            </p>
            <ul className="combo-list"><li>Todos os pedidos acompanham 2 shoyu e 2 tare.</li><li>Combos com sashimi incluem wasabi e gengibre.</li></ul>
            <div className="combo-feature__foot">
              <div className="price">
                {brl(featuredCombo.price)}
              </div>
              <AddButton
                className="btn btn--red"
                item={{
                  id: featuredCombo.id,
                  name: featuredCombo.name,
                  price: featuredCombo.price,
                  img: featuredCombo.img,
                  cat: "Combos",
                }}
              >
                Adicionar ao pedido{" "}
                <span className="btn__arrow" aria-hidden="true">
                  <Plus aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} />
                </span>
              </AddButton>
            </div>
          </div>
        </article>

        <div className="combo-side">
          {combos.map((combo) => (
            <article className="combo-card" data-reveal data-item-id={combo.id} key={combo.id}>
              <div
                className={
                  combo.tone
                    ? `combo-card__media combo-card__media--${combo.tone}`
                    : "combo-card__media"
                }
              >
                {combo.badge && <span className={combo.tone ? "tag tag--gold" : "tag"}>{combo.badge}</span>}
                <img
                  src={combo.img}
                  width={combo.width}
                  height={combo.height}
                  alt={combo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="combo-card__body">
                <div className="combo-card__top">
                  <h3>{combo.name}</h3>
                  <span>{combo.pieces}</span>
                </div>
                <p>{combo.desc}</p>
                <div className="combo-card__foot">
                  <span className="price price--sm">{brl(combo.price)}</span>
                  <AddButton
                    className="round-add"
                    ariaLabel={`Adicionar ${combo.name} ao carrinho`}
                    item={{
                      id: combo.id,
                      name: combo.name,
                      price: combo.price,
                      img: combo.img,
                      cat: "Combos",
                    }}
                  >
                    <Plus aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} />
                  </AddButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
