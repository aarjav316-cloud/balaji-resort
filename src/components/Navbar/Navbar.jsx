import React, { useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 text-white selection:bg-white/20">
        {/* 
          Responsive Content Container
          Whitespace scales naturally with clamp-based padding.
        */}
        <div className="w-full mx-auto px-[clamp(1.5rem,5vw,6rem)] py-[clamp(1.25rem,3.5vh,3.5rem)]">
          <div className="flex items-center justify-between">
            {/* Left Section: Menu */}
            <div className="flex-1 flex justify-start">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="group flex items-center gap-3 md:gap-4 hover:opacity-70 transition-opacity duration-500 cursor-pointer"
                aria-label="Open Menu"
              >
                <MenuIcon size={26} strokeWidth={1} className="hidden md:block" />
                <MenuIcon size={22} strokeWidth={1.25} className="block md:hidden" />
                <span className="uppercase text-[11px] md:text-xs lg:text-sm tracking-[0.15em] lg:tracking-[0.2em] font-light hidden md:inline-block">
                  Menu
                </span>
              </button>
            </div>

            {/* Center Section: Logo Placeholder */}
            <div className="flex-none flex justify-center">
              <a
                href="/"
                className="hover:opacity-80 transition-opacity duration-700"
                aria-label="Balaji Resort Home"
              >
                <h1 className="uppercase text-[13px] sm:text-base md:text-lg lg:text-xl tracking-[0.25em] md:tracking-[0.35em] font-normal sm:font-light whitespace-nowrap text-center">
                  Balaji Resort
                </h1>
              </a>
            </div>

            {/* Right Section: Reserve */}
            <div className="flex-1 flex justify-end">
              <a
                href="/reserve"
                className="relative uppercase text-[11px] md:text-xs lg:text-sm tracking-[0.15em] lg:tracking-[0.2em] font-light group py-2"
              >
                Reserve
                <span className="absolute left-0 bottom-1 w-full h-[1px] bg-white/50 origin-right transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-left"></span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Integration */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

export default Navbar;