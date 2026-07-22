import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const content = [
  "Nestled in a peaceful location away from the city's hustle and bustle, Balaji Marriage Lawn, Resort & Restaurant offers the perfect place for celebrations, family gatherings, and dining.",
  "Surrounded by open spaces and a calm atmosphere, our venue provides a comfortable and beautiful setting for weddings, receptions, birthdays, corporate events, and special occasions.",
  "With quality service, modern facilities, and warm hospitality, we strive to make every visit and every event truly memorable."
];

function EditorialIntro() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Animates when top of section hits 80% of viewport down
          once: true,       // Only animate once
        },
        defaults: { ease: "power3.out" }
      });

      // 1. Eyebrow fades in gently
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.4 }
      );

      // 2. Heading reveals elegantly
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.6 },
        "-=1.0"
      );

      // 3. Paragraphs appear progressively with a natural stagger
      tl.fromTo(
        paragraphsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.15 },
        "-=1.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      data-navbar-theme="light"
      className="w-full bg-[#E8E7E5] text-[#2E2925] pt-[clamp(6rem,15vh,12rem)] pb-[clamp(3rem,7.5vh,6rem)] px-[clamp(1.5rem,5vw,6rem)] flex justify-center"
    >
      <div className="max-w-[850px] w-full mx-auto flex flex-col items-center text-center">
        
        {/* Eyebrow Label */}
        <span 
          ref={eyebrowRef}
          className="uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-light mb-8 md:mb-12 opacity-0"
        >
          About Balaji Resort
        </span>

        {/* Main Heading */}
        <h2 
          ref={headingRef}
          className="font-['Cormorant_Garamond',_serif] text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] font-light mb-12 md:mb-20 opacity-0 tracking-tight"
        >
          A Perfect Venue for Every Occasion
        </h2>

        {/* Body Text */}
        <div className="flex flex-col gap-8 md:gap-10 text-base md:text-lg lg:text-[1.35rem] font-light leading-[1.8] md:leading-[1.9]">
          {content.map((text, idx) => (
            <p 
              key={idx}
              ref={(el) => (paragraphsRef.current[idx] = el)}
              className="opacity-0 transition-colors duration-700 ease-in-out hover:text-[#0C0B0A] cursor-default"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EditorialIntro;
