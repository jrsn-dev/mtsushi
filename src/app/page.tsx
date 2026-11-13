import SushiLanding from "../components/SushiLanding";

export default function Home() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP || process.env.VITE_WHATSAPP || "").trim();
  const facebook = (process.env.NEXT_PUBLIC_FACEBOOK || "").trim();
  return <SushiLanding facebook={/^https:\/\/(www\.)?facebook\.com\/.+/i.test(facebook) ? facebook : ""}  whatsapp={/^55\d{10,11}$/.test(whatsapp) ? whatsapp : ""} />;
}
