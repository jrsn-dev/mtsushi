import { ArrowRight, Bike, ChevronRight, ConciergeBell, House, List, MapPin, Package, ShoppingCart, Store } from "lucide-react";
import { BusinessHours } from "./BusinessHours";
import type { OrderLink } from "./SushiMenu";

const benefits = [
  [Bike, "Entrega rápida"],
  [Package, "Embalagem segura"],
  [ConciergeBell, "Pratos sempre quentinhos"],
] as const;

export function SushiDelivery({ order }: { order: OrderLink }) {
  return (
    <section className="shell delivery-grid" aria-labelledby="delivery-title">
      <div className="delivery-copy">
        <h2 id="delivery-title">Peça no<br />nosso delivery<span>.</span></h2>
        <p>Sabor, praticidade e rapidez diretamente<br className="delivery-break" /> na sua casa.</p>
        <BusinessHours />
        <ul className="delivery-benefits">
          {benefits.map(([Icon, label]) => (
            <li key={label}><Icon aria-hidden="true" />{label}</li>
          ))}
        </ul>
        <div className="delivery-actions">
          <a className="button button-red" href="/cardapio">
            <ShoppingCart aria-hidden="true" /> Fazer meu pedido <ArrowRight aria-hidden="true" />
          </a>
          <a className="button delivery-menu-link" href="/cardapio">
            <List aria-hidden="true" /> Ver cardápio <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <a className="delivery-map" href={order("confirmar se vocês entregam na minha região")} target="_blank" rel="noreferrer">
        <svg className="delivery-route" viewBox="0 0 560 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g className="delivery-streets">
            <path d="M-10 48Q65 72 118 53T252 20T423 -15M-10 110Q100 149 164 127T297 83T570 40M-10 180Q112 220 160 207T280 172L570 126M-10 265Q74 287 115 297M110 343Q215 293 328 261T570 209M411 194L550 155" />
            <path d="M23 -10Q58 30 80 73L212 390M125 -10Q178 30 205 67T258 165L364 390M246 -10L455 390M337 -10L537 390M451 -10L570 236M57 197L124 348" />
          </g>
          <path className="delivery-route-line" d="M153 264L202 249Q225 243 235 218T269 186L328 170Q347 166 334 149T346 129L454 103" />
          <ellipse className="delivery-store-glow" cx="153" cy="264" rx="22" ry="11" />
          <g className="delivery-pin delivery-store" transform="translate(153 215)">
            <path d="M0 49C-6 39-25 15-25 0a25 25 0 1 1 50 0C25 15 6 39 0 49Z" />
            <circle r="22" />
            <Store x="-12" y="-12" width="24" height="24" />
          </g>
          <g className="delivery-pin delivery-home" transform="translate(454 60)">
            <path d="M0 43C-6 34-24 13-24 0a24 24 0 1 1 48 0C24 13 6 34 0 43Z" />
            <House x="-12" y="-12" width="24" height="24" />
          </g>
        </svg>
        <span className="delivery-map-label"><MapPin aria-hidden="true" /> Delivery na sua região <ChevronRight aria-hidden="true" /></span>
      </a>
    </section>
  );
}
