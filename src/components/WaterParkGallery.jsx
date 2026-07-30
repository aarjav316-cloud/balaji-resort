import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../assets/waterpark/image1.webp";
import image2 from "../assets/waterpark/image2.webp";
import image3 from "../assets/waterpark/image3.webp";
import image4 from "../assets/waterpark/image4.webp";

gsap.registerPlugin(ScrollTrigger);

export default function WaterParkGallery() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Text block animations
      tl.fromTo(
        textRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15 }
      );

      // Images slide up and fade in one by one
      const validImages = imagesRef.current.filter(Boolean);
      tl.fromTo(
        validImages,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.2 },
        "-=0.9" // overlaps text animation slightly
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#E8E7E5] px-[clamp(1.5rem,5vw,6rem)] pb-[clamp(5rem,12vh,10rem)] flex flex-col items-center"
    >
      <div className="max-w-[1600px] w-full flex flex-col">
        
        {/* Intro Text */}
        <div 
          ref={textRef} 
          className="flex flex-col items-center text-center max-w-[750px] mx-auto mb-16 md:mb-24 text-[#2E2925]"
        >
          <span className="uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-light mb-6 opacity-0">
            Aquatic Experiences
          </span>
          <h2 className="font-['Cormorant_Garamond',_serif] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] font-light tracking-tight mb-8 opacity-0">
            Moments of Endless Fun
          </h2>
          <p className="text-base md:text-lg lg:text-[1.2rem] font-light leading-relaxed md:leading-[1.8] text-[#2E2925]/80 opacity-0">
            Discover exciting slides, refreshing pools, relaxing corners, and unforgettable family moments designed to create lasting memories for guests of every age.
          </p>
        </div>

        {/* Editorial Asymmetrical Gallery */}
        <div className="flex flex-col gap-6 md:gap-[clamp(2rem,4vw,4rem)]">
          
          {/* Top Row: 60% / 40% */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[clamp(2rem,4vw,4rem)]">
            <div 
              ref={(el) => (imagesRef.current[0] = el)}
              className="w-full md:w-3/5 rounded-[24px] md:rounded-[28px] overflow-hidden group opacity-0 relative bg-[#E8E7E5]"
            >
              <img
                src={image1}
                alt="Featured Water Park View"
                className="w-full h-auto object-cover transition-all duration-[700ms] ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                loading="lazy"
              />
            </div>
            
            <div 
              ref={(el) => (imagesRef.current[1] = el)}
              className="w-full md:w-2/5 rounded-[24px] md:rounded-[28px] overflow-hidden group opacity-0 relative bg-[#E8E7E5]"
            >
              <img
                src={image2}
                alt="Aquatic Experience Detail"
                className="w-full h-auto object-cover transition-all duration-[700ms] ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bottom Row: 40% / 60% */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[clamp(2rem,4vw,4rem)]">
            <div 
              ref={(el) => (imagesRef.current[2] = el)}
              className="w-full md:w-2/5 rounded-[24px] md:rounded-[28px] overflow-hidden group opacity-0 relative bg-[#E8E7E5]"
            >
              <img
                src={image3}
                alt="Relaxing Pools"
                className="w-full h-auto object-cover transition-all duration-[700ms] ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                loading="lazy"
              />
            </div>
            
            <div 
              ref={(el) => (imagesRef.current[3] = el)}
              className="w-full md:w-3/5 rounded-[24px] md:rounded-[28px] overflow-hidden group opacity-0 relative bg-[#E8E7E5]"
            >
              <img
                src={image4}
                alt="Family Moments"
                className="w-full h-auto object-cover transition-all duration-[700ms] ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                loading="lazy"
              />
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
