import SushiLanding from "../components/SushiLanding";

export default function Home() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP || process.env.VITE_WHATSAPP || "").trim();
  return <SushiLanding whatsapp={/^55\d{10,11}$/.test(whatsapp) ? whatsapp : ""} />;
}
