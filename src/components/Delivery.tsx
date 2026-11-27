import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import styles from "./Delivery.module.css";
import { site, whatsappLink } from "@/lib/site";

export default function Delivery() {
  return (
    <section className={`section delivery ${styles.section}`} id="delivery" aria-labelledby="delivery-title">
      <svg className={styles.ribbon} viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="delivery-ribbon" x1="0" y1="0" x2="1" y2=".5">
            <stop stopColor="#41030b" stopOpacity=".15" />
            <stop offset=".5" stopColor="#ef1029" stopOpacity=".55" />
            <stop offset="1" stopColor="#830512" stopOpacity=".55" />
          </linearGradient>
          <pattern id="delivery-wave-pattern" width="72" height="32" patternUnits="userSpaceOnUse">
            <path d="M-36 16Q-18 -2 0 16T36 16T72 16T108 16M-36 32Q-18 14 0 32T36 32T72 32T108 32" fill="none" stroke="#ff243c" strokeWidth=".65" opacity=".45" />
          </pattern>
          <path id="delivery-ribbon-shape" d="M0 105C280 210 440 210 650 112S1010 260 1240 206S1450 48 1600 12L1600 185C1430 215 1370 290 1160 260S870 93 650 150S230 300 0 275Z" />
        </defs>
        <use href="#delivery-ribbon-shape" fill="url(#delivery-ribbon)" />
        <use href="#delivery-ribbon-shape" fill="url(#delivery-wave-pattern)" />
        <path d="M0 275C230 300 440 210 650 150S950 230 1160 260S1430 215 1600 185" stroke="#ff1932" strokeWidth="2" fill="none" />
        <path d="M0 105C280 210 440 210 650 112S1010 260 1240 206S1450 48 1600 12" stroke="#d80d24" strokeWidth="2" fill="none" />
      </svg>
      <div className="section__inner">
        <div className={`delivery__card ${styles.card}`} data-reveal>
          <div className={`delivery__copy ${styles.copy}`}>
            <h2 id="delivery-title" data-split>A arte chega <em>até você.</em></h2>
            <p>Peças artesanais, embaladas com cuidado e entregues na sua casa.</p>
            <div className={`delivery__actions ${styles.actions}`}>
              <a className="btn btn--red" href={whatsappLink("Olá! Quero pedir no MTSUSHI ARTE.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                <span>Pedir no WhatsApp</span>
                <ArrowRight className="btn__arrow" aria-hidden="true" />
              </a>
              <a className={styles.location} href={whatsappLink("Olá! Gostaria de consultar a entrega para minha região em Jacarezinho.")} target="_blank" rel="noopener noreferrer">
                <MapPin aria-hidden="true" /><span>Delivery em {site.address.city}</span>
              </a>
            </div>
            <p className="delivery__note">Segunda a sexta, das 18h às 23h</p>
          </div>
        </div>
      </div>
    </section>
  );
}
