"use client";

import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "@/lib/hours";

export default function OpenStatus() {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span
      className={`info-card__status${state && !state.open ? " is-closed" : ""}`}
      role="status"
      aria-live="polite"
      title={state?.detail}
    >
      <i />
      {state ? state.label : "Seg–Sex · 18h às 23h"}
    </span>
  );
}
