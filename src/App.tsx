import { lazy, Suspense, useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import About from "./components/About";
import Analytics from "./components/Analytics";
import Contact from "./components/Contact";
import CookieBanner from "./components/CookieBanner";
import CookiePolicy from "./components/CookiePolicy";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Industries from "./components/Industries";
import Navbar from "./components/Navbar";
import Privacy from "./components/Privacy";
import Services from "./components/Services";

const ChatWidget = lazy(() => import("./components/ChatWidget"));

function isPrivacyHash(hash = window.location.hash): boolean {
  return hash === "#privacy";
}

export default function App() {
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const [cookiePolicyOpen, setCookiePolicyOpen] = useState(false);
  const [privacyPage, setPrivacyPage] = useState(() =>
    typeof window === "undefined" ? false : isPrivacyHash(),
  );

  useEffect(() => {
    const syncPage = () => {
      const privacy = isPrivacyHash();
      setPrivacyPage(privacy);
      if (privacy) {
        window.scrollTo(0, 0);
        return;
      }

      const id = window.location.hash.slice(1);
      if (!id) return;
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
    };

    syncPage();
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <Analytics />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        {privacyPage ? (
          <Privacy />
        ) : (
          <>
            <Home />
            <About />
            <Services />
            <Industries />
            <Contact />
          </>
        )}
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
