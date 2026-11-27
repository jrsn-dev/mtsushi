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
              →
            </span>
          </a>
          <a className="btn btn--ghost" href="#contato">
            Falar com a casa
          </a>
        </div>

        <div className="hero__features hero-fade">
          <div className="feature">
            <span className="feature__icon">
              <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M6 18.5c3.8-4.2 9.6-6 15.8-4.6 2.7.6 4.7 2.2 4.2 4.3-.5 2.2-3.3 3-6.1 2.4-5.6-1.2-10.1-3.4-13.9-2.1Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 18.5c-1.8-.7-2.9-2.3-2.2-3.8.6-1.4 2.5-1.8 4.4-1"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M21.6 14.2c1.3-1.6 2.9-2.2 4.4-2.1M12 19.4c.8 1.4 1 2.9.6 4.2"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <circle cx="23.3" cy="17.6" r=".9" fill="currentColor" />
              </svg>
            </span>
            <div>
              <strong>Peixes frescos</strong>
              <span>Seleção diária</span>
            </div>
          </div>
          <div className="feature">
            <span className="feature__icon">
              <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M26 6C14.5 6.5 7 12.2 7 20.2c0 2.1.7 3.8 1.8 5.1C12 17 17.5 12.3 24 10.2c-5.7 3.4-9.6 8.1-11.4 15.2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.8 25.3C16 26.4 25 22.7 26 6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <strong>Ingredientes premium</strong>
              <span>Origem cuidadosa</span>
            </div>
          </div>
          <div className="feature">
            <span className="feature__icon">
              <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M9.5 14.5c0-4 2.9-7 6.5-7s6.5 3 6.5 7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M7 17.5c0-1.4 1.1-2.5 2.5-2.5h13c1.4 0 2.5 1.1 2.5 2.5v2.2c0 2.9-2.4 5.3-5.3 5.3h-7.4C9.4 25 7 22.6 7 19.7v-2.2Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M13 18.5v3.2M19 18.5v3.2"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
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
          <div className="hero__rating">
            <span className="stars" aria-hidden="true">
              ★★★★★
            </span>
            <span>
              <strong>4,9</strong>
            </span>
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
