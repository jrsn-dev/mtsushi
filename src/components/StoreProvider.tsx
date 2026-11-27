"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CART_KEY,
  addItem,
  cartCount,
  cartTotal,
  changeQty,
  parseCart,
  removeItem,
  type CartItem,
} from "@/lib/cart";
import { menuFilters, type FilterKey } from "@/lib/menu";

export type Panel = "cart" | "search" | "menu";

const FILTER_KEYS = menuFilters.map(item => item.key);

type StoreValue = {
  cart: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  panel: Panel | null;
  openPanel: (panel: Panel) => void;
  togglePanel: (panel: Panel) => void;
  closePanels: () => void;
  filter: FilterKey;
  setFilter: (filter: FilterKey) => void;
  toast: string | null;
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [filter, setFilterState] = useState<FilterKey>("todos");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Carrinho: carrega depois da hidratação para não divergir do HTML do servidor. */
  useEffect(() => {
    try {
      setCart(parseCart(window.localStorage.getItem(CART_KEY)));
    } catch {
      /* localStorage indisponível */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* modo privado */
    }
  }, [cart, hydrated]);

  /* Filtro inicial vindo da URL (compartilhável). */
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("categoria");
    if (fromUrl && FILTER_KEYS.includes(fromUrl as FilterKey)) {
      setFilterState(fromUrl as FilterKey);
    }
  }, []);

  /* Trava o scroll da página e o Lenis enquanto um painel está aberto. */
  useEffect(() => {
    const locked = panel !== null;
    document.body.classList.toggle("is-locked", locked);
    const api = (window as unknown as { __mtsushi?: { lock?: (on: boolean) => void } })
      .__mtsushi;
    api?.lock?.(locked);
    return () => {
      document.body.classList.remove("is-locked");
      api?.lock?.(false);
    };
  }, [panel]);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const add = useCallback(
    (item: Omit<CartItem, "qty">) => {
      setCart((current) => addItem(current, item));
      notify(`${item.name} adicionado ao carrinho`);
    },
    [notify]
  );

  const increment = useCallback((id: string) => {
    setCart((current) => changeQty(current, id, 1));
  }, []);

  const decrement = useCallback((id: string) => {
    setCart((current) => changeQty(current, id, -1));
  }, []);

  const remove = useCallback((id: string) => {
    setCart((current) => removeItem(current, id));
  }, []);

  const openPanel = useCallback((next: Panel) => setPanel(next), []);
  const closePanels = useCallback(() => setPanel(null), []);
  const togglePanel = useCallback(
    (next: Panel) => setPanel((current) => (current === next ? null : next)),
    []
  );

  const setFilter = useCallback((next: FilterKey) => {
    setFilterState(next);
    const url = new URL(window.location.href);
    if (next === "todos") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", next);
    window.history.replaceState(null, "", url);
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      count: cartCount(cart),
      total: cartTotal(cart),
      add,
      increment,
      decrement,
      remove,
      panel,
      openPanel,
      togglePanel,
      closePanels,
      filter,
      setFilter,
      toast,
      notify,
    }),
    [
      cart,
      add,
      increment,
      decrement,
      remove,
      panel,
      openPanel,
      togglePanel,
      closePanels,
      filter,
      setFilter,
      toast,
      notify,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore precisa estar dentro de StoreProvider");
  return context;
}
