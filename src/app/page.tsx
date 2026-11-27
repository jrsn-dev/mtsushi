import { StoreProvider } from "@/components/StoreProvider";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Combos from "@/components/Combos";
import Contact from "@/components/Contact";
import Delivery from "@/components/Delivery";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import MobileMenu from "@/components/MobileMenu";
import Navbar from "@/components/Navbar";
import Overlays from "@/components/Overlays";
import Preloader from "@/components/Preloader";
import SushiRail from "@/components/SushiRail";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <StoreProvider>
      <link rel="stylesheet" href="/assets/css/style.css" />
      <link rel="stylesheet" href="/assets/css/improvements.css" />
      <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      <a className="skip-link" href="#inicio">
        Pular para o conteúdo
      </a>

      <Preloader />

      <div className="noise" aria-hidden="true" />
      <div className="page-progress" aria-hidden="true">
        <span className="page-progress__bar" />
      </div>

      <Navbar />
      <MobileMenu />

      <SushiRail />

      <main className="site" id="site">
        <Hero />
        <Ticker />
        <Categories />
        <Combos />
        <About />
        <MenuSection />
        <Delivery />
        <Contact />
        <Footer />
      </main>

      <Overlays />
      <script src="/assets/js/home-motion.js" defer />
    </StoreProvider>
  );
}
