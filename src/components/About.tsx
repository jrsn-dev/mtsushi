export default function About() {
  return (
    <section className="section about" id="arte">
      <div className="section__inner about__inner">
        <div className="about__visual" data-reveal>
          <div className="about__circle" />
          <div className="about__ring" />
          <div className="about__dish">
            <img
              className="parallax-img"
              src="/assets/img/temaki-salmon.png"
              width={519}
              height={703}
              alt="Temaki de salmão MTSUSHI"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about__orbit" aria-hidden="true">
            <svg viewBox="0 0 160 160">
              <defs>
                <path
                  id="aboutPath"
                  d="M80,80 m-63,0 a63,63 0 1,1 126,0 a63,63 0 1,1 -126,0"
                />
              </defs>
              <text>
                <textPath href="#aboutPath" startOffset="0">
                  MTSUSHI ARTE · SUSHI DE AUTOR · FEITO À MÃO ·{" "}
                </textPath>
              </text>
            </svg>
          </div>
          <div className="about__seal">
            <strong>12</strong>
            <span>
              anos de
              <br />
              história
            </span>
          </div>
          <p className="about__caption">
            “Cada peça nasce das mãos,
            <br />
            não da pressa.”
          </p>
          <span className="about__kanji" aria-hidden="true">
            職人の心
          </span>
        </div>

        <div className="about__copy" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__line" />
            Nossa arte
          </p>
          <h2 data-split>
            Tradição que se sente. <em>Arte</em> que se prova.
          </h2>
          <p>
            O MTSUSHI nasce de uma obsessão: tratar cada peça como uma obra. O arroz
            no ponto exato, o corte preciso, o peixe que chega fresco todas as
            manhãs. Nada é aleatório — e é isso que você sente no primeiro bite.
          </p>
          <p>
            Do balcão às mãos, nossa cozinha mistura a disciplina da tradição
            japonesa com a liberdade de quem gosta de criar. O resultado é uma
            experiência autoral, feita para ser lembrada.
          </p>

          <div className="stats">
            <div className="stat">
              <strong>
                40<sup>+</sup>
              </strong>
              <span>criações autorais</span>
            </div>
            <div className="stat">
              <strong>
                100<sup>%</sup>
              </strong>
              <span>preparado na hora</span>
            </div>
            <div className="stat">
              <strong>
                4,9<sup>★</sup>
              </strong>
              <span>avaliação dos clientes</span>
            </div>
          </div>

          <div className="about__sign">
            <div>
              <strong>Marcelo Tanaka</strong>
              <span>Fundador &amp; chef executivo</span>
            </div>
            <a className="link-arrow" href="#menu">
              Conheça as criações <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
