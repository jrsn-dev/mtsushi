import { ArrowUpRight } from "lucide-react";
import { Photo } from "./SushiMenu";
export function ChefSpecial() {
  return (
    <section className="shell section" aria-labelledby="chef-title">
      <div className="chef-panel">
        <div className="chef-copy"><h2 id="chef-title">Combinados.</h2>
          <p>Uma seleção de peças para compartilhar.</p><a className="button button-red" href="/cardapio?categoria=combos">Ver combos <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <Photo image="supremo" alt="Bandeja de sushi do Combinado supremo" />
      </div>
    </section>
  );
}
