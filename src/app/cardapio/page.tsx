import "./catalog.css";
import type { Metadata } from "next";
import { DigitalMenu } from "../../components/DigitalMenu";

export const metadata: Metadata = {
  title: "Cardápio digital | MT Sushi Arte",
  description: "Veja as categorias e monte seu pedido de delivery da MT Sushi Arte em Jacarezinho.",
};

export default async function CardapioPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string | string[] }>;
}) {
  const { categoria } = await searchParams;
  const selected = typeof categoria === "string" ? categoria : "";
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP || process.env.VITE_WHATSAPP || "").trim();
  return <DigitalMenu selected={selected} whatsapp={/^55\d{10,11}$/.test(whatsapp) ? whatsapp : ""} />;
}
