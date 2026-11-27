import OpenStatus from "@/components/OpenStatus";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section className="section contact" id="contato">
      <div className="section__inner">
        <div className="contact__head" data-reveal>
          <div>
            <p className="eyebrow">
              <span className="eyebrow__line" />
              Onde nos encontrar
            </p>
            <h2 data-split>
              Faça seu <em>pedido.</em>
            </h2>
          </div>
          <p>
            Sushis, temakis e combinados artesanais com delivery em Jacarezinho.
          </p>
        </div>

        <div className="contact__grid">
          <article className="info-card" data-reveal>
            <span className="info-card__icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <h3>Endereço</h3>
            <p>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state}
            </p>
            <a className="info-card__link" href={site.mapsUrl} target="_blank" rel="noopener">
              Abrir no mapa →
            </a>
          </article>

          <article className="info-card" data-reveal>
            <span className="info-card__icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 7.5V12l3 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <h3>Horários</h3>
            <p>
              Segunda a sexta · 18h às 23h
            </p>
            <OpenStatus />
          </article>

          <article className="info-card" data-reveal>
            <span className="info-card__icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.5 4.5h3l1.3 4-2 1.4a12 12 0 0 0 5.3 5.3l1.4-2 4 1.3v3c0 1.1-.9 2-2 2C10.4 19.5 4.5 13.6 4.5 6.5c0-1.1.9-2 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3>Contato</h3>
            <p>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
              <br />
              <a href={site.social.instagram}>@mtsushiarte</a>
            </p>
            <a
              className="info-card__link"
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener"
            >
              Falar no WhatsApp →
            </a>
          </article>
        </div>

        <div className="contact__cta" data-reveal>
          <div>
            <span className="contact__cta-label">Delivery em Jacarezinho</span>
            <p>Consulte a entrega para sua região.</p>
          </div>
          <a
            className="btn btn--red"
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
              "Olá! Gostaria de fazer um pedido no MTSUSHI ARTE."
            )}`}
            target="_blank"
            rel="noopener"
          >
            Pedir pelo WhatsApp{" "}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
