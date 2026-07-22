import { useState, useEffect, useRef, useCallback } from "react";
import { Menu as MenuIcon } from "lucide-react";
import gsap from "gsap";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for individual elements — sequenced reveal on load
  const menuBtnRef = useRef(null);
  const brandRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. The entire header fades in as a soft foundation
      tl.fromTo(
        headerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.6 }
      );

      // 2. Menu button and brand reveal with a gentle upward drift
      //    Staggered so the eye moves left → right naturally
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
        "-=0.9" // slight delay after menu — intentional sequencing
      );
    });

    return () => ctx.revert();
  }, []);

  const handleOpenMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 text-white selection:bg-white/20"
        style={{ opacity: 0 }} /* prevent FOUC before GSAP runs */
      >
        <div className="w-full mx-auto px-[clamp(1.5rem,5vw,6rem)] py-[clamp(1.25rem,3.5vh,3.5rem)]">
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