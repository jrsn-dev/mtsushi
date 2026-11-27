import { ArrowRight } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="arte" className={styles.section} aria-labelledby="arte-title">
      <div className={`section__inner ${styles.copy}`} data-reveal>
        <p className={styles.brand}>MTSUSHI ARTE · 12 anos de história</p>
        <h2 id="arte-title">Tradição que se sente. <em>Arte</em> que se prova.</h2>
        <p>O MTSUSHI ARTE nasce de uma obsessão pela excelência: tratar cada peça como uma obra, com o arroz no ponto exato, o corte preciso e o peixe que chega fresco todas as manhãs, selecionado com rigor.</p>
        <p>Do balcão às mãos, nossa cozinha honra a tradição japonesa com a liberdade de quem cria. O resultado é uma experiência autoral, elegante e memorável, feita para os verdadeiros amantes da alta gastronomia japonesa.</p>
        <blockquote>“Cada peça nasce das mãos, não da pressa.”</blockquote>
        <dl className={styles.stats}>
          {[
            ["40", "+", "Criações autorais"], ["100", "%", "Preparado na hora"],
          ].map(([value, unit, label]) => <div key={label}><dt>{label}</dt><dd>{value}<sup>{unit}</sup></dd></div>)}
        </dl>
        <a className={styles.cta} href="/cardapio">Conheça as criações <span aria-hidden="true"><ArrowRight aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} /></span></a>
      </div>
    </section>
  );
}
