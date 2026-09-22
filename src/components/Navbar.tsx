import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { company } from "../config/company";
import { easeOutExpo } from "../lib/motion";
import BrandMark from "./BrandMark";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Company" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

const menuList = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const menuItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const navRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY > 16;
        setSolid((current) => (current === next ? current : next));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
        return;
      }

      if (event.key !== "Tab" || !navRootRef.current) return;

      const focusable = [
        ...navRootRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ].filter((element) => !element.classList.contains("sr-only"));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={navRootRef} className="fixed inset-x-0 top-0 z-50">
      <div
        className={`glass-nav relative z-20 pt-[env(safe-area-inset-top,0px)] transition-[background-color,box-shadow] duration-300 ${
          solid || open ? "bg-white/70" : "bg-white/28"
        }`}
      >
        <nav
          className="container-page flex h-[3.85rem] min-w-0 items-center justify-between gap-2 sm:h-[4.75rem] sm:gap-4"
          aria-label="Primary"
        >
        <a href="#home" className="min-w-0 shrink-0" onClick={close}>
          <span className="sr-only">Gold Mans Supply Corporation home</span>
          <span aria-hidden="true">
            <BrandMark />
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary text-sm">
            Get in Touch
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="icon-glass inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink lg:hidden"
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

      <AnimatePresence>
        {open ? (
          <m.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-10 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: easeOutExpo }}
          >
            <div className="absolute inset-0 bg-paper" />

            <m.div
              className="relative flex h-full flex-col px-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-[calc(3.85rem+env(safe-area-inset-top,0px)+0.75rem)] pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:pt-[calc(4.75rem+env(safe-area-inset-top,0px)+1rem)]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            >
              <p className="text-[11px] tracking-[0.22em] text-gold-bright">
                MENU
              </p>

              <m.ul
                className="mt-5 flex-1 overflow-y-auto overscroll-contain"
                initial={reduce ? false : "hidden"}
                animate="visible"
                variants={reduce ? undefined : menuList}
              >
                {links.map((link, index) => (
                  <m.li
                    key={link.href}
                    variants={reduce ? undefined : menuItem}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  >
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={close}
                      className="group flex items-center justify-between gap-4 border-b border-white/50 py-4"
                    >
                      <span className="flex min-w-0 items-baseline gap-4">
                        <span className="font-serif text-[11px] tracking-[0.2em] text-gold-bright">
                          0{index + 1}
                        </span>
                        <span className="text-[1.7rem] leading-none tracking-[-0.03em] text-ink sm:text-[2rem]">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.6}
                        className="shrink-0 text-gold-bright opacity-60 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  </m.li>
                ))}
              </m.ul>

              <div className="mt-6 space-y-4">
                <a
                  href="#contact"
                  onClick={close}
                  className="btn-primary w-full"
                >
                  Get in Touch
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </a>
                <p className="text-center text-xs tracking-[0.08em] text-ink-muted">
                  <a
                    href={`mailto:${company.email}`}
                    className="break-all hover:text-ink"
                  >
                    {company.email}
                  </a>
                </p>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
