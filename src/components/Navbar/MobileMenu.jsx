import { useEffect, useRef, useCallback, useState } from "react";
import { X as CloseIcon } from "lucide-react";
import gsap from "gsap";

/**
 * Navigation items — single source of truth.
 * Extracted so the render array and ref array stay in sync.
 */
const NAV_ITEMS = ["The Resort", "Accommodations", "Dining", "Wellness", "Experiences"];

/**
 * Builds the opening GSAP timeline.
 * Pure function — no side-effects beyond the returned timeline.
 * Accepts DOM refs so it stays decoupled from React render logic.
 */
function buildOpenTimeline({ overlay, header, links, onReverseComplete }) {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.out" },
    onReverseComplete,
  });

  // Phase 1 — Overlay appears (the "door opens")
  tl.fromTo(
    overlay,
    { opacity: 0, visibility: "visible" },
    { opacity: 1, duration: 0.8, ease: "power2.inOut" }
  );

  // Phase 2 — Header bar materialises with a gentle downward settle
  tl.fromTo(
    header,
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.9 },
    "-=0.35"
  );

  // Phase 3 — Navigation links reveal in a natural stagger
  //           yPercent keeps distance proportional across screen sizes
  tl.fromTo(
    links,
    { opacity: 0, yPercent: 40 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power4.out",
    },
    "-=0.55"
  );

  return tl;
}

function MobileMenu({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  // DOM refs
  const overlayRef = useRef(null);
  const headerRef = useRef(null);
  const linksRef = useRef([]);

  // Persistent timeline ref — survives across renders
  const tlRef = useRef(null);

  // --------------- Mount / Unmount ---------------
  // When isOpen becomes true  → mount immediately so DOM is available for GSAP.
  // When isOpen becomes false → timeline reverses; onReverseComplete unmounts.
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  // --------------- Lock body scroll ---------------
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // --------------- GSAP lifecycle ---------------
  // This effect runs once when `mounted` becomes true.
  // The timeline is built once and then played / reversed via the isOpen ref-check.
  useEffect(() => {
    if (!mounted) return;

    // Small rAF delay to guarantee refs are populated after React commit
    const frameId = requestAnimationFrame(() => {
      // Filter out any null refs (defensive)
      const validLinks = linksRef.current.filter(Boolean);

      tlRef.current = buildOpenTimeline({
        overlay: overlayRef.current,
        header: headerRef.current,
        links: validLinks,
        onReverseComplete: () => {
          setMounted(false);
          document.body.style.overflow = "";
        },
      });

      // Play immediately on first mount
      tlRef.current.play();
    });

    return () => {
      cancelAnimationFrame(frameId);
      // Full cleanup — kill all inline styles GSAP added
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [mounted]);

  // --------------- Play / Reverse on isOpen change ---------------
  useEffect(() => {
    if (!tlRef.current) return;

    if (isOpen) {
      // Reset timeScale in case it was changed during a previous close
      tlRef.current.timeScale(1).play();
    } else {
      // Reverse at a slightly brisker pace — closing should feel decisive
      tlRef.current.timeScale(1.3).reverse();
    }
  }, [isOpen]);

  // --------------- Guard ---------------
  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/95 text-white flex flex-col font-sans backdrop-blur-sm"
      style={{ visibility: "hidden" }} /* GSAP flips this to visible */
    >
      {/* Header — mirrors main navbar constraint for alignment */}
      <div
        ref={headerRef}
        className="w-full mx-auto px-[clamp(1.5rem,5vw,6rem)] py-[clamp(1.25rem,3.5vh,3.5rem)] flex justify-between items-center"
        style={{ opacity: 0 }}
      >
        {/* Left: Close */}
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

        {/* Center: Subtle branding */}
        <div className="flex-none flex justify-center opacity-0 md:opacity-100">
          <span className="uppercase tracking-[0.3em] font-light text-sm text-white/50">
            Balaji Resort
          </span>
        </div>

        {/* Right: Spacer for balance */}
        <div className="flex-1 flex justify-end opacity-0 pointer-events-none">
          <span className="text-[11px] md:text-xs lg:text-sm tracking-[0.2em]">Close</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col items-center justify-center space-y-8 md:space-y-12 pb-20">
        {NAV_ITEMS.map((item, i) => (
          <div key={item} className="overflow-hidden py-1">
            <a
              ref={(el) => { linksRef.current[i] = el; }}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="block uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] md:tracking-[0.25em] hover:text-white/50 transition-colors duration-700"
              style={{ opacity: 0 }}
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
