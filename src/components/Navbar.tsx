import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { company, hasVerifiedPhone } from "../config/company";
import { easeOutExpo } from "../lib/motion";
import BrandMark from "./BrandMark";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Products and Services" },
  { href: "#industries", label: "Industries We Serve" },
  { href: "#contact", label: "Contact Us" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const navRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const menu = (
    <AnimatePresence>
      {open ? (
        <m.div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[64] h-dvh w-full bg-white lg:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: easeOutExpo }}
        >
          <div className="flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain px-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-[calc(3.85rem+env(safe-area-inset-top,0px)+1rem)] pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:pt-[calc(6.6rem+1rem)]">
            <ul className="space-y-1">
              {links.map((link, index) => (
                <li key={link.href}>
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={close}
                    className="flex min-h-12 items-center border-b border-paper-soft py-3 text-lg text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-4 pt-8">
              <ul className="space-y-3 text-sm text-ink-muted">
                <li className="flex items-start gap-2">
                  <MapPin size={15} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                  <span>{company.location}</span>
                </li>
                {hasVerifiedPhone() ? (
                  <li>
                    <a
                      className="flex min-h-11 items-center gap-2"
                      href={`tel:${company.phone.replace(/\s/g, "")}`}
                    >
                      <Phone size={15} strokeWidth={1.8} className="shrink-0" />
                      {company.phone}
                    </a>
                  </li>
                ) : null}
                <li>
                  <a
                    className="flex min-h-11 items-center gap-2 break-all"
                    href={`mailto:${company.email}`}
                  >
                    <Mail size={15} strokeWidth={1.8} className="shrink-0" />
                    {company.email}
                  </a>
                </li>
              </ul>
              <a href="#contact" onClick={close} className="btn-primary w-full">
                Contact Us
              </a>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
    <div ref={navRootRef} className="fixed inset-x-0 top-0 z-[65]">
      <div className="site-utility hidden pt-[env(safe-area-inset-top,0px)] sm:block">
        <div className="container-page flex h-9 items-center justify-between gap-4">
          <p className="flex min-w-0 items-center gap-2">
            <MapPin size={13} strokeWidth={1.8} />
            <span className="truncate">{company.location}</span>
          </p>
          <div className="flex items-center gap-5">
            {hasVerifiedPhone() ? (
              <a className="inline-flex items-center gap-1.5 hover:text-white" href={`tel:${company.phone.replace(/\s/g, "")}`}>
                <Phone size={13} strokeWidth={1.8} />
                {company.phone}
              </a>
            ) : null}
            <a className="inline-flex items-center gap-1.5 hover:text-white" href={`mailto:${company.email}`}>
              <Mail size={13} strokeWidth={1.8} />
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="site-header relative z-20 pt-[env(safe-area-inset-top,0px)] sm:pt-0">
        <nav
          className="container-page flex h-[3.85rem] min-w-0 items-center justify-between gap-2 sm:h-[4.35rem] sm:gap-4"
          aria-label="Primary"
        >
          <a href="#home" className="min-w-0 flex-1 lg:flex-none" onClick={close}>
            <span className="sr-only">Goldman’s Supply Corporation home</span>
            <span aria-hidden="true">
              <BrandMark />
            </span>
          </a>

          <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-gold-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a href="#contact" className="btn-primary text-sm">
              Contact Us
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="icon-glass inline-flex size-11 shrink-0 items-center justify-center rounded-md text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block size-4" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[1.5px] w-4 origin-center bg-current transition-transform duration-300 ${
                  open ? "top-[7px] rotate-45" : "top-[3px]"
                }`}
              />
              <span
                className={`absolute top-[7px] left-0 block h-[1.5px] w-4 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-4 origin-center bg-current transition-transform duration-300 ${
                  open ? "top-[7px] -rotate-45" : "top-[11px]"
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

    </div>
    {menu}
    </>
  );
}
