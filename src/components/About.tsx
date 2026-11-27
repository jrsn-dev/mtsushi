import styles from "./About.module.css";

export default function About() {
  return (
    <section id="arte" className={styles.section} aria-labelledby="arte-title">
      <img className={styles.blossoms} src="/images/arte-sakura.svg" alt="" />
      <div className={styles.inner}>
        <figure className={styles.visual} data-reveal>
          <div className={styles.stage}>
            <svg className={styles.orbit} viewBox="0 0 600 600" aria-hidden="true">
              <defs>
                <radialGradient id="arte-halo">
                  <stop stopColor="#601317" /><stop offset=".67" stopColor="#250507" /><stop offset="1" stopColor="#090304" />
                </radialGradient>
                <linearGradient id="arte-rim" x1="0" x2="1" y1="0" y2="1">
                  <stop stopColor="#72080d" /><stop offset=".24" stopColor="#ffd2a0" /><stop offset=".32" stopColor="#ff333a" />
                  <stop offset=".65" stopColor="#68070e" /><stop offset=".83" stopColor="#ff5155" /><stop offset="1" stopColor="#601015" />
                </linearGradient>
                <filter id="arte-light" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" /></filter>
                <path id="arte-name" d="M105 176 A237 237 0 0 1 368 76" />
                <path id="arte-motto" d="M503 151 A247 247 0 0 1 350 541" />
              </defs>
              <circle cx="300" cy="300" r="293" fill="none" stroke="#b82729" strokeDasharray="1 6" />
              <circle cx="300" cy="300" r="274" fill="url(#arte-halo)" stroke="url(#arte-rim)" />
              <g fill="none" stroke="#ff5141" strokeWidth="5" filter="url(#arte-light)">
                <path d="M65 159 A274 274 0 0 1 309 26 M540 431 A274 274 0 0 1 458 524" />
              </g>
              <path d="M214 40 Q264 22 318 27" fill="none" stroke="#ffe4b0" strokeWidth="1.6" />
              <g fill="#edd3a1" fontFamily="Georgia,serif">
                <text fontSize="18" letterSpacing="6"><textPath href="#arte-name">MTSUSHI ARTE</textPath></text>
                <text fontSize="16" letterSpacing="4"><textPath href="#arte-motto">SUSHI DE AUTOR · FEITO À MÃO</textPath></text>
              </g>
            </svg>
            <span className={styles.kanji} lang="ja" aria-hidden="true">職人の心</span>
            <img className={styles.temaki} src="/assets/img/temaki-salmon.webp" alt="Temaki artesanal de salmão" width="620" height="850" />
            <span className={styles.seal}><b>12</b><span>anos de<br />história</span></span>
          </div>
          <figcaption>“Cada peça nasce das mãos,<br />não da pressa.”</figcaption>
        </figure>
        <div className={styles.copy} data-reveal>
          <p className={styles.brand}>MTSUSHI ARTE</p>
          <h2 id="arte-title">Tradição que se<br /> sente. <em>Arte</em> que se prova.</h2>
          <p>O MTSUSHI ARTE nasce de uma obsessão pela excelência: tratar cada peça como uma obra, com o arroz no ponto exato, o corte preciso e o peixe que chega fresco todas as manhãs, selecionado com rigor.</p>
          <p>Do balcão às mãos, nossa cozinha honra a tradição japonesa com a liberdade de quem cria. O resultado é uma experiência autoral, elegante e memorável, feita para os verdadeiros amantes da alta gastronomia japonesa.</p>
          <dl className={styles.stats}>
            {[
              ["40", "+", "Criações autorais"], ["100", "%", "Preparado na hora"], ["4,9", "★", "Avaliação dos clientes"],
            ].map(([value, unit, label]) => <div key={label}><dt>{label}</dt><dd>{value}<sup>{unit}</sup></dd></div>)}
          </dl>
          <a className={styles.cta} href="/cardapio">Conheça as criações <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
