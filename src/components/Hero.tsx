import { Fish, Leaf, ChefHat, ArrowRight } from "lucide-react";
export default function Hero() {
  return (
    <section className="section hero" id="inicio">
      <div className="hero__kanji" aria-hidden="true">
        鮨
      </div>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner section__inner">
        <h1 className="hero__title">
          <span className="line">
            <span>
              Sushi é <em>arte</em>,
            </span>
          </span>
          <span className="line">
            <span>
              sabor é <em>ritual</em>.
            </span>
          </span>
        </h1>

        <p className="hero__lead hero-fade">
          Peixes selecionados, técnica japonesa e um olhar contemporâneo. Cada peça
          é criada à mão para transformar o seu jantar em uma experiência que fica
          na memória.
        </p>

        <div className="hero__actions hero-fade">
          <a className="btn btn--red" href="/cardapio">
            Explorar o cardápio{" "}
            <span className="btn__arrow" aria-hidden="true">
              <ArrowRight aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} />
            </span>
          </a>
          <a className="btn btn--ghost" href="#contato">
            Falar com a casa
          </a>
        </div>

        <div className="hero__features hero-fade">
          <div className="feature">
            <span className="feature__icon">
              <Fish aria-hidden="true" />
            </span>
            <div>
              <strong>Peixes frescos</strong>
              <span>Seleção diária</span>
            </div>
          </div>
          <div className="feature">
            <span className="feature__icon">
              <Leaf aria-hidden="true" />
            </span>
            <div>
              <strong>Ingredientes premium</strong>
              <span>Origem cuidadosa</span>
            </div>
          </div>
          <div className="feature">
            <span className="feature__icon">
              <ChefHat aria-hidden="true" />
            </span>
            <div>
              <strong>Chefs especializados</strong>
              <span>Técnica japonesa</span>
            </div>
          </div>
        </div>

        <div className="hero__meta hero-fade">
          <div className="hero__scroll">
            <span className="scroll-line" />
            role para descobrir
          </div>
        </div>
      </div>

      <div className="hero__stamp" aria-hidden="true">
        <svg viewBox="0 0 140 140">
          <defs>
            <path
              id="stampPath"
              d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"
            />
          </defs>
          <text>
            <textPath href="#stampPath" startOffset="0">
              MTSUSHI ARTE · SUSHI DE AUTOR ·{" "}
            </textPath>
          </text>
        </svg>
        <span className="hero__stamp-core">鮨</span>
      </div>
    </section>
  );
}
