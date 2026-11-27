"use client";

import type { ReactNode } from "react";
import { useStore } from "@/components/StoreProvider";

type AddButtonProps = {
  item: { id: string; name: string; price: number; img: string; cat: string };
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function AddButton({
  item,
  className,
  ariaLabel,
  children,
}: AddButtonProps) {
  const { add } = useStore();

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => add(item)}
    >
      {children}
    </button>
  );
}
