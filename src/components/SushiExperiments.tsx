import { ArrowUpRight } from "lucide-react";
import { Photo } from "./SushiMenu";
export function ChefSpecial() {
  return (
    <section className="shell section" aria-labelledby="chef-title">
      <div className="chef-panel">
        <div className="chef-copy"><h2 id="chef-title">Combo do Chef.</h2>
          <p>Uma seleção de peças para compartilhar.</p><a className="button button-red" href="/cardapio?categoria=combos">Ver combos <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <Photo image="platter" alt="Seleção de sushis e sashimis em um prato preto" />
      </div>
    </section>
  );
}
