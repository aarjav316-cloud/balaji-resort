import { useState, useEffect, useRef, useCallback } from "react";
import { Menu as MenuIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileMenu from "./MobileMenu";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────
 *  THEME PRESETS
 *  Add entries here as the site grows (e.g. "accent", "inverted").
 *  Each key maps to values that `transitionNavbar` will tween to.
 * ────────────────────────────────────────────────────────────── */
const NAVBAR_THEMES = {
  dark: { color: "#ffffff", glassOpacity: 0 },
  light: { color: "#2E2925", glassOpacity: 1 },
};

/* How far from the viewport top the trigger line sits (≈ navbar midpoint) */
const TRIGGER_OFFSET = 60;

/* Transition duration — long enough to feel smooth, short enough to stay responsive */
const TRANSITION_DURATION = 0.5;

/* ──────────────────────────────────────────────────────────────
 *  transitionNavbar()
 *  Pure animation function — no React dependency.
 *  Tweens the glass backdrop opacity and the content color.
 *  `overwrite: true` prevents conflicting tweens when scrolling fast.
 * ────────────────────────────────────────────────────────────── */
function transitionNavbar(glassEl, contentEl, themeName) {
  const theme = NAVBAR_THEMES[themeName];
  if (!theme || !glassEl || !contentEl) return;

  gsap.to(glassEl, {
    opacity: theme.glassOpacity,
    duration: TRANSITION_DURATION,
    ease: "power2.inOut",
    overwrite: true,
  });

  gsap.to(contentEl, {
    color: theme.color,
    duration: TRANSITION_DURATION,
    ease: "power2.inOut",
    overwrite: true,
  });
}

/* ══════════════════════════════════════════════════════════════ */

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // DOM refs
  const menuBtnRef = useRef(null);
  const brandRef = useRef(null);
  const headerRef = useRef(null);
  const glassRef = useRef(null);
  const contentRef = useRef(null); // wrapper — color cascades to all children + SVG icons

  // Cleanup ref for ScrollTriggers
  const triggersRef = useRef([]);

  // ─── Page-load reveal ─────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.6 }
      );

      tl.fromTo(
        menuBtnRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=1.0"
      );

      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.9"
      );
    });

    return () => ctx.revert();
  }, []);

  // ─── Section-aware theme transitions ──────────────────────
  useEffect(() => {
    // rAF ensures all section components have committed to the DOM
    const frameId = requestAnimationFrame(() => {
      const sections = gsap.utils.toArray("[data-navbar-theme]");
      const glass = glassRef.current;
      const content = contentRef.current;

      sections.forEach((section) => {
        const theme = section.dataset.navbarTheme;

        triggersRef.current.push(
          ScrollTrigger.create({
            trigger: section,
            start: `top top+=${TRIGGER_OFFSET}`,
            end: `bottom top+=${TRIGGER_OFFSET}`,
            onEnter: () => transitionNavbar(glass, content, theme),
            onEnterBack: () => transitionNavbar(glass, content, theme),
          })
        );
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  // ─── Callbacks ────────────────────────────────────────────
  const handleOpenMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const handleCloseMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50"
        style={{ opacity: 0 }}
      >
        {/*
          Glass backdrop — sits behind content, animated independently.
          Blur is baked in; GSAP only toggles opacity for performance.
        */}
        <div
          ref={glassRef}
          className="absolute inset-0 border-b border-black/[0.04]"
          style={{
            opacity: 0,
            backgroundColor: "rgba(232, 231, 229, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          aria-hidden="true"
        />

        {/* Content wrapper — `color` cascades to text + lucide SVG icons via currentColor */}
        <div
          ref={contentRef}
          className="relative w-full mx-auto px-[clamp(1.5rem,5vw,6rem)] py-[clamp(1.25rem,3.5vh,3.5rem)]"
          style={{ color: "#ffffff" }}
        >
          <div className="flex items-center justify-between">

            {/* Left: Menu */}
            <div className="flex-1 flex justify-start">
              <button
                ref={menuBtnRef}
                onClick={handleOpenMenu}
                className="group flex items-center gap-3 md:gap-4 hover:opacity-70 transition-opacity duration-500 cursor-pointer"
                aria-label="Open Menu"
                style={{ opacity: 0 }}
              >
                <MenuIcon size={26} strokeWidth={1} className="hidden md:block" />
                <MenuIcon size={22} strokeWidth={1.25} className="block md:hidden" />
                <span className="uppercase text-[11px] md:text-xs lg:text-sm tracking-[0.15em] lg:tracking-[0.2em] font-light hidden md:inline-block">
                  Menu
                </span>
              </button>
            </div>

            {/* Center: Empty */}
            <div className="flex-none" />

            {/* Right: Balaji Resort */}
            <div className="flex-1 flex justify-end">
              <a
                ref={brandRef}
                href="/"
                className="hover:opacity-80 transition-opacity duration-700"
                aria-label="Balaji Resort Home"
                style={{ opacity: 0 }}
              >
                <h1 className="uppercase text-[13px] sm:text-base md:text-lg lg:text-xl tracking-[0.25em] md:tracking-[0.35em] font-normal sm:font-light whitespace-nowrap text-right">
                  Balaji Resort
                </h1>
              </a>
            </div>

          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMenu} />
    </>
  );
}

export default Navbar;