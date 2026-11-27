
import NewsletterForm from "@/components/NewsletterForm";
import { site } from "@/lib/site";

const socials = [
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 21v-7h2.6l.4-3H14V9.2c0-.9.3-1.5 1.6-1.5H17V5.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7H14Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.5c.3 2.8 1.7 4.6 4.4 5.4l1-1.4 1.8.7c-.2 1.6-1.1 2.3-2.5 2.3-3.2-.2-5.8-2.8-6.1-6.2 0-1.2.8-2 2.2-2.1l.6 1.8L9 8.5Z"
          fill="currentColor"
        />
      </svg>
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
