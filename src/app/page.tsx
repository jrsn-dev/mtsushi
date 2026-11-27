import Script from "next/script";
import { StoreProvider } from "@/components/StoreProvider";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Combos from "@/components/Combos";
import Contact from "@/components/Contact";
import Delivery from "@/components/Delivery";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileMenu from "@/components/MobileMenu";
import Navbar from "@/components/Navbar";
import Overlays from "@/components/Overlays";
import SushiRail from "@/components/SushiRail";

export default function Home() {
  return (
    <StoreProvider>
      <link rel="stylesheet" precedence="home" href="/assets/css/style.css?v=3" />
      <link rel="stylesheet" precedence="home" href="/assets/css/improvements.css?v=27" />
      <a className="skip-link" href="#inicio">
        Pular para o conteúdo
      </a>

      <div className="noise" aria-hidden="true" />
      <div className="page-progress" aria-hidden="true">
        <span className="page-progress__bar" />
      </div>

      <Navbar />
      <MobileMenu />

      <SushiRail />

      <main className="site" id="site">
        <div className="home-spacer" aria-hidden="true" />
        <div className="home-content">
          <Hero />
          <Categories />
          <Combos />
          <About />
          <Delivery />
          <Contact />
          <Footer />
        </div>
      </main>

      <Overlays />
      <Script src="/assets/js/home-safe.js?v=1" strategy="afterInteractive" />
    </StoreProvider>
  );
}
