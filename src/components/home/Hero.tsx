export default function Hero() {
  return (
    <section className="section hero" id="inicio">
      <div className="hero__kanji" aria-hidden="true">
        鮨
      </div>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner section__inner">
        <p className="eyebrow hero-fade">
          <span className="eyebrow__line" />
          Jacarezinho, PR · Somente delivery
        </p>

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
          Sushis, temakis e combinados preparados à mão. Segunda a sexta, das 18h às 23h.
        </p>

        <div className="hero__actions hero-fade">
          <a className="btn btn--red" href="/cardapio">
            Explorar o cardápio{" "}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn--ghost" href="#contato">
            Falar com a MT Sushi
          </a>
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
              MTSUSHI ARTE · SUSHI DE AUTOR · JACAREZINHO ·{" "}
            </textPath>
          </text>
        </svg>
        <span className="hero__stamp-core">鮨</span>
      </div>
    </section>
  );
}
