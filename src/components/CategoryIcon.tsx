import { Soup, Fish, Shrimp, Flame, CircleDot, Cone, Shell, Layers3, IceCreamBowl, CookingPot, UtensilsCrossed } from "lucide-react";

const byCategory: Record<string, typeof Fish> = {
  entradas: Soup, uramakis: Fish, "uramakis-premium": Shrimp, "hot-rolls": Flame,
  hossomakis: CircleDot, temakis: Cone, jyos: Shell, combos: Layers3,
  sobremesas: IceCreamBowl, domingo: CookingPot,
};

export function CategoryIcon({ slug }: { slug: string }) {
  const Icon = byCategory[slug] ?? UtensilsCrossed;
  return <Icon aria-hidden="true" strokeWidth={1.8} fill="currentColor" fillOpacity={0.18} />;
}
