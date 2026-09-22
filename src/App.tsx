import { lazy, Suspense, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import About from "./components/About";
import Analytics from "./components/Analytics";
import CompanySnapshot from "./components/CompanySnapshot";
import Contact from "./components/Contact";
import CookieBanner from "./components/CookieBanner";
import CookiePolicy from "./components/CookiePolicy";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Technology from "./components/Technology";
import Values from "./components/Values";
import WhyUs from "./components/WhyUs";

const ChatWidget = lazy(() => import("./components/ChatWidget"));

export default function App() {
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const [cookiePolicyOpen, setCookiePolicyOpen] = useState(false);

  return (
    <LazyMotion features={domAnimation} strict>
      <Analytics />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <CompanySnapshot />
        <About />
        <Services />
        <Projects />
        <Technology />
        <WhyUs />
        <Values />
        <Contact />
        <CTA />
      </main>
      <Footer
        onManageCookies={() => setCookieSettingsOpen(true)}
        onOpenCookiePolicy={() => setCookiePolicyOpen(true)}
      />
      <CookieBanner
        forceOpen={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
        onOpenPolicy={() => setCookiePolicyOpen(true)}
      />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
      <CookiePolicy
        open={cookiePolicyOpen}
        onClose={() => setCookiePolicyOpen(false)}
        onManageCookies={() => setCookieSettingsOpen(true)}
      />
    </LazyMotion>
  );
}
