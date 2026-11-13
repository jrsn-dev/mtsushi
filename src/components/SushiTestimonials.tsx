import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "motion/react";
import { ArrowRight, MessageCircle, Star } from "lucide-react";

const examples = [
  ["AL", "Ana L.", "O temaki chegou bem montado, com o nori crocante e bastante salmão."],
  ["BR", "Bruno R.", "Pedimos um combinado para dividir em casa. Foi uma ótima maneira de experimentar várias peças."],
  ["CM", "Carla M.", "As peças chegaram organizadas e o arroz estava no ponto."],
  ["DS", "Diego S.", "O nigiri de salmão foi o meu favorito. A textura do peixe fez toda a diferença."],
  ["EP", "Elisa P.", "O combinado chegou bem embalado. Cada pessoa encontrou uma peça favorita."],
  ["FG", "Felipe G.", "O pedido veio bem embalado. Gostei especialmente do uramaki de salmão."],
  ["HM", "Helena M.", "Experimentamos o sashimi e os temakis. O corte do salmão estava delicado."],
  ["JV", "João V.", "Pedi o combo para o jantar. Foi fácil dividir e provar um pouco de tudo."],
] as const;

export function SushiTestimonials({ href }: { href: string }) {
  const [pageSize, setPageSize] = useState(4);
  const [first, setFirst] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [hasChanged, setHasChanged] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);
  const visible = useInView(carousel, { once: true, amount: .15 });

  useEffect(() => {
    const compact = matchMedia("(max-width: 640px)");
    const medium = matchMedia("(max-width: 1050px)");
    const update = () => {
      setPageSize(compact.matches ? 1 : medium.matches ? 2 : 4);
      setPending(null);
    };
    update();
    compact.addEventListener("change", update);
    medium.addEventListener("change", update);
    return () => {
      compact.removeEventListener("change", update);
      medium.removeEventListener("change", update);
    };
  }, []);

  const page = Math.floor(first / pageSize);
  const pages = Math.ceil(examples.length / pageSize);
  function showPage(start: number) {
    setFirst(start);
    setHasChanged(true);
    setPending(null);
  }

  function goTo(index: number) {
    if (index === page) return;
    const start = index * pageSize;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showPage(start);
      return;
    }
    setPending(start);
  }

  useEffect(() => {
    if (pending === null) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) showPage(pending);
    };
    preference.addEventListener("change", update);
    update();
    return () => preference.removeEventListener("change", update);
  }, [pending]);

  return (
    <section className="shell testimonials section" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="testimonials-heading">
        <h2 id="testimonials-title">Depoimentos<br />de clientes<span>.</span></h2>
        <div className="testimonials-intro">
          <p>Conte como foi sua experiência com o MT Sushi Arte.</p>
          <a className="button button-red" href={href} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> Deixar meu depoimento <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="testimonials-note mono">Depoimentos ilustrativos</p>
      <div className="testimonials-carousel" ref={carousel} data-revealed={visible}>
        <div className="testimonial-cards" id="testimonial-cards"
          data-phase={pending !== null ? "stack" : hasChanged ? "unstack" : "initial"}>
          {examples.slice(page * pageSize, (page + 1) * pageSize).map(([initials, name, quote], index) => (
            <article className="testimonial-card" key={name} style={{
              "--card-index": index,
              "--stack-delay": `${(pageSize - 1 - index) * 85}ms`,
              "--unstack-delay": `${index * 85}ms`,
            } as CSSProperties} onAnimationEnd={(event) => {
              if (index === 0 && event.target === event.currentTarget && event.animationName === "testimonial-stack" && pending !== null) {
                showPage(pending);
              }
            }}>
              <header>
                <span className="testimonial-initials" aria-hidden="true">{initials}</span>
                <div>
                  <strong>{name}</strong>
                  <div className="testimonial-stars" role="img" aria-label="5 de 5 estrelas">
                    {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}
                  </div>
                </div>
              </header>
              <blockquote>“{quote}”</blockquote>
            </article>
          ))}
        </div>
        <div className="testimonial-pages" aria-label="Páginas de depoimentos">
          {Array.from({ length: pages }, (_, index) => (
            <button type="button" key={index} aria-label={`Página ${index + 1}`} aria-current={index === page ? "true" : undefined}
              aria-controls="testimonial-cards" onClick={() => goTo(index)} />
          ))}
        </div>
        <p className="visually-hidden" role="status">Página {page + 1} de {pages}</p>
      </div>
    </section>
  );
}
