import { Instagram, Facebook, MessageCircle } from "lucide-react";

import NewsletterForm from "@/components/NewsletterForm";
import { site } from "@/lib/site";

const socials = [
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <Instagram aria-hidden="true" />
    ),
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    icon: (
      <Facebook aria-hidden="true" />
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    icon: (
      <MessageCircle aria-hidden="true" />
    ),
  },
].filter((social) => social.href);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="brand" href="#inicio" aria-label="MTSUSHI ARTE — início">
              <span className="brand__seal">
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path
                    d="M7 12.8c5.8-1.7 12.1-2.5 17-2.5s11.2.8 17 2.5"
                    stroke="currentColor"
                    strokeWidth="3.1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.4 18.7c4.6-.9 9.4-1.4 13.6-1.4s9 .5 13.6 1.4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14.2 19.6 15.7 38M33.8 19.6 32.3 38"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21.2 20.4v8.4M26.8 20.4v8.4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity=".8"
                  />
                </svg>
              </span>
              <span className="brand__type">
                <strong>MTSUSHI</strong>
                <span>ARTE</span>
              </span>
            </a>
            <p>
              Gastronomia japonesa de alta qualidade, onde tradição e exclusividade se
              encontram.
            </p>
            <div className="socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4>Explorar</h4>
            <a href="#inicio">Início</a>
            <a href="/cardapio">Cardápio</a>
            <a href="#combos">Combos</a>
            <a href="#arte">Nossa arte</a>
          </div>

          <div className="footer__col">
            <h4>A casa</h4>
            <a href="#contato">Contato</a>
            <a href="#delivery">Delivery</a>
            <a href={site.social.instagram}>Instagram</a>
          </div>

          <div className="footer__news">
            <h4>Receba nossas criações</h4>
            <p>
              Novidades do balcão, edições limitadas e convites para experiências.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © <span id="year">{new Date().getFullYear()}</span> MTSUSHI ARTE. Todos os
            direitos reservados.
          </span>
          <span className="footer__made">Feito com precisão e um toque de ousadia.</span>
          <div className="footer__legal">
            <a href="https://fluidy.site">Fluidy</a>
          </div>
        </div>
      </div>
      <div className="footer__kanji" aria-hidden="true">
        鮨
      </div>
    </footer>
  );
}
