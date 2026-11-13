import type { Metadata, Viewport } from "next";
import "@fontsource-variable/noto-sans";
import "@fontsource-variable/noto-sans/wght-italic.css";
import "@fontsource-variable/roboto/standard.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MT Sushi Arte | Sushi artesanal",
  description: "Sushis, temakis e combos artesanais. Conheça o cardápio e peça delivery em Jacarezinho, Paraná.",
  icons: { icon: "/images/mt-sushi-logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
