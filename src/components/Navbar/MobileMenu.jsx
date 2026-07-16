import React, { useEffect } from "react";
import { X as CloseIcon } from "lucide-react";

function MobileMenu({ isOpen, onClose }) {
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 text-white flex flex-col font-sans backdrop-blur-sm transition-opacity duration-500">
      {/* Same header constraint layout as main navbar for visual consistency */}
      <div className="w-full mx-auto px-[clamp(1.5rem,5vw,6rem)] py-[clamp(1.25rem,3.5vh,3.5rem)] flex justify-between items-center">
        {/* Left Section: Close */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={onClose}
            className="group flex items-center gap-3 md:gap-4 hover:opacity-70 transition-opacity duration-500 cursor-pointer"
            aria-label="Close Menu"
          >
            <CloseIcon size={26} strokeWidth={1} className="hidden md:block" />
            <CloseIcon size={24} strokeWidth={1.25} className="block md:hidden" />
            <span className="uppercase text-[11px] md:text-xs lg:text-sm tracking-[0.15em] lg:tracking-[0.2em] font-light hidden md:inline-block">
              Close
            </span>
          </button>
        </div>

        {/* Center: Subtle branding inside menu */}
        <div className="flex-none flex justify-center opacity-0 md:opacity-100">
          <span className="uppercase tracking-[0.3em] font-light text-sm text-white/50">
            Balaji Resort
          </span>
        </div>

        {/* Right: Balance spacing (hidden) */}
        <div className="flex-1 flex justify-end opacity-0 pointer-events-none">
          <span className="text-[11px] md:text-xs lg:text-sm tracking-[0.2em]">Close</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col items-center justify-center space-y-8 md:space-y-12 pb-20">
        {["The Resort", "Accommodations", "Dining", "Wellness", "Experiences"].map((item) => (
          <div key={item} className="overflow-hidden">
            <a
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="block uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] md:tracking-[0.25em] hover:text-white/50 transition-colors duration-700"
            >
              {item}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default MobileMenu;
