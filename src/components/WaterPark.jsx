import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import waterParkImg from "../assets/waterpark/headerimage.avif";

gsap.registerPlugin(ScrollTrigger);

export default function WaterPark() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Image fades in gently
      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );

      // Eyebrow appears
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=1.0"
      );

      // Heading reveals softly
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4 },
        "-=0.9"
      );

      // Paragraph fades upward
      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4 },
        "-=1.1"
      );

      // Button appears last
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=1.0"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="waterpark"
      ref={sectionRef}
      data-navbar-theme="light"
      className="w-full bg-[#E8E7E5] flex justify-center py-[clamp(3rem,8vh,6rem)] px-[clamp(1.5rem,5vw,6rem)]"
    >
      <div 
        ref={imageContainerRef}
        className="relative w-full max-w-[1600px] h-[70vh] md:h-[80vh] lg:h-[85vh] rounded-[28px] md:rounded-[32px] overflow-hidden group opacity-0"
      >
        {/* Background Image */}
        <img
          src={waterParkImg}
          alt="Water Park at Balaji Resort"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:brightness-105 group-hover:contrast-105"
          loading="lazy"
        />

        {/* Subtle Luxury Overlay */}
        <div className="absolute inset-0 bg-[#2E2925]/30 transition-colors duration-[1.2s] ease-out group-hover:bg-[#2E2925]/20" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-10 z-10 text-[#E8E7E5]">
          <span
            ref={eyebrowRef}
            className="uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-light mb-4 sm:mb-6 opacity-0 shadow-sm drop-shadow-md"
          >
            Endless Fun
          </span>
          <h2
            ref={headingRef}
            className="font-['Cormorant_Garamond',_serif] text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.05] font-light tracking-tight mb-6 md:mb-8 opacity-0 drop-shadow-lg"
          >
            Water Park
          </h2>
          <p
            ref={introRef}
            className="text-base md:text-lg lg:text-[1.125rem] font-light leading-relaxed md:leading-[1.8] opacity-0 max-w-[600px] mb-10 drop-shadow-md"
          >
            Experience refreshing adventures, exciting water attractions, relaxing poolside moments, and unforgettable family fun in a vibrant environment designed for guests of every age.
          </p>
          
          <button
            ref={buttonRef}
            className="relative overflow-hidden px-8 py-4 sm:px-10 sm:py-4 rounded-full border-[0.5px] border-[#E8E7E5]/70 text-[#E8E7E5] text-xs sm:text-sm md:text-base tracking-[0.15em] font-light uppercase transition-all duration-500 ease-out hover:bg-[#E8E7E5] hover:text-[#2E2925] hover:border-[#E8E7E5] opacity-0"
          >
            <span>Discover the Water Park</span>
          </button>
        </div>
      </div>
    </section>
  );
}
