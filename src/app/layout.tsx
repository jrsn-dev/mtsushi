import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MT Sushi Arte | Sushi artesanal",
  description: "Sushis, temakis e combos artesanais. Conheça o cardápio e peça delivery em Jacarezinho, Paraná.",
  icons: { icon: "/images/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
