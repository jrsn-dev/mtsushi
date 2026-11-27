import { MapPin, Clock3, Phone, ArrowRight } from "lucide-react";
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
              <MapPin aria-hidden="true" />
            </span>
            <h3>Endereço</h3>
            <p>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state}
            </p>
            <a className="info-card__link" href={site.mapsUrl} target="_blank" rel="noopener">
              Abrir no mapa <ArrowRight aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} />
            </a>
          </article>

          <article className="info-card" data-reveal>
            <span className="info-card__icon">
              <Clock3 aria-hidden="true" />
            </span>
            <h3>Horários</h3>
            <p>
              Segunda a sexta · 18h às 23h
            </p>
            <OpenStatus />
          </article>

          <article className="info-card" data-reveal>
            <span className="info-card__icon">
              <Phone aria-hidden="true" />
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
              Falar no WhatsApp <ArrowRight aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} />
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
              <ArrowRight aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
