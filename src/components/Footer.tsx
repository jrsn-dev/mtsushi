import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "Facebook", href: site.social.facebook, Icon: Facebook },
  { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}`, Icon: MessageCircle },
].filter((social) => social.href);

export default function Footer() {
  return (
    <footer className="footer footer--minimal">
      <div className="section__inner">
        <div className="footer__main">
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
          <nav className="footer__links" aria-label="Navegação do rodapé">
            <a href="/cardapio">Cardápio</a>
            <a href="#delivery">Delivery</a>
            <a href="#contato">Contato</a>
          </nav>
          <div className="socials" aria-label="Redes sociais">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <span>© <span id="year">{new Date().getFullYear()}</span> MTSUSHI ARTE. Todos os direitos reservados.</span>
          <a className="footer__credit" href="https://fluidy.site" target="_blank" rel="noopener noreferrer"><span>Desenvolvido por</span><img src="/images/fluidy-navbar.svg" alt="Fluidy" width={82} height={22} decoding="async" loading="lazy" /></a>
        </div>
      </div>
    </footer>
  );
}
