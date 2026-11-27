import { ArrowRight } from "lucide-react";
import styles from "./Delivery.module.css";
import { site, whatsappLink } from "@/lib/site";

export default function Delivery() {
  return (
    <section className="section delivery" id="delivery">
      <div className="section__inner">
        <div className="delivery__card" data-reveal>
          <div className="delivery__brush" aria-hidden="true">
            <img
              src="/assets/img/brush.webp"
              width={1600}
              height={1067}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="delivery__waves" aria-hidden="true" />
          <div className="delivery__copy">
            <p className="eyebrow">
              <span className="eyebrow__line" />
              Delivery MTSUSHI
            </p>
            <h2 data-split>
              A arte chega <em>até você.</em>
            </h2>
            <p>
              Peças artesanais, embaladas com cuidado e entregues na sua casa.
            </p>
            <div className="delivery__actions">
              <a
                className="btn btn--red"
                href={whatsappLink("Olá! Quero pedir no MTSUSHI ARTE.")}
                target="_blank"
                rel="noopener"
              >
                Pedir no WhatsApp{" "}
                <span className="btn__arrow" aria-hidden="true">
                  <ArrowRight aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} />
                </span>
              </a>
              <span className="delivery__time">
                <i />
                Delivery em Jacarezinho
              </span>
            </div>
            <p className="delivery__note">
              Segunda a sexta, das 18h às 23h
            </p>
          </div>
          <div className={`delivery__art ${styles.art}`} aria-hidden="true">
            <div className={styles.turn}>
              <img
                className="delivery__rai"
                src="/assets/img/sushiraxi.webp"
                width={1000}
                height={800}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <p className="sr-only">
          Delivery em {site.address.city}.
        </p>
      </div>
    </section>
  );
}
