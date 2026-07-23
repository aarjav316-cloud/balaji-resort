import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const eventsList = [
  {
    title: "Weddings",
    desc: "Timeless celebrations crafted beautifully",
  },
  {
    title: "Corporate Events",
    desc: "Professional gatherings with refined hospitality",
  },
  {
    title: "Social Celebrations",
    desc: "Moments shared with family and friends",
  },
  {
    title: "Cultural & Community Events",
    desc: "Honoring traditions with elegance",
  },
  {
    title: "Entertainment & Public Events",
    desc: "Vibrant experiences for every occasion",
  },
  {
    title: "Group Stays & Destination Events",
    desc: "Comfortable stays for unforgettable memories",
  },
];

function EventRow({ event, rowRef }) {
  return (
    <div 
      ref={rowRef}
      className="group relative cursor-pointer opacity-0 will-change-transform flex flex-col pt-8 pb-8 md:pt-10 md:pb-10"
    >
      <div className="flex items-center justify-between z-10 w-full mb-1">
        <h3 className="font-['Cormorant_Garamond',_serif] text-3xl md:text-4xl text-[#2E2925]/80 transition-colors duration-500 group-hover:text-[#2E2925]">
          {event.title}
        </h3>
        
        {/* Typographic Arrow - Slides softly into view */}
        <span className="font-light text-2xl text-[#2E2925] opacity-0 -translate-x-4 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-x-0">
          &rarr;
        </span>
      </div>
      
      <p className="text-sm md:text-base font-light tracking-wide text-[#2E2925]/60 transition-colors duration-500 group-hover:text-[#2E2925]/80 z-10 pr-8">
        {event.desc}
      </p>

      {/* Static Subdued Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2E2925]/10" />

      {/* Animated Subtle Premium Hover Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2E2925]/40 origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" />
    </div>
  );
}

function EventsWeHost() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const rowsRef = useRef([]);

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

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 }
      );

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4 },
        "-=0.8"
      );

      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4 },
        "-=1.0"
      );

      // Stagger rows delicately
      const validRows = rowsRef.current.filter(Boolean);
      tl.fromTo(
        validRows,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 },
        "-=0.6"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="events"
      ref={sectionRef}
      data-navbar-theme="light"
      className="w-full bg-[#E8E7E5] text-[#2E2925] pt-[clamp(3rem,7.5vh,6rem)] pb-[clamp(6rem,15vh,12rem)] px-[clamp(1.5rem,5vw,6rem)] flex justify-center"
    >
      <div className="max-w-[900px] w-full mx-auto flex flex-col">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center opacity-0. mb-16 md:mb-24">
          <span 
            ref={eyebrowRef}
            className="uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-light mb-6 opacity-0"
          >
            Events
          </span>
          <h2 
            ref={headingRef}
            className="font-['Cormorant_Garamond',_serif] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.1] font-light tracking-tight mb-8 md:mb-10 opacity-0"
          >
            Events We Host
          </h2>
          <p 
            ref={introRef}
            className="text-base md:text-lg lg:text-[1.3rem] font-light leading-relaxed md:leading-[1.9] text-[#2E2925]/80 opacity-0 max-w-[800px]"
          >
            From intimate gatherings to grand celebrations, Balaji Resort provides thoughtfully designed spaces and exceptional hospitality to make every occasion memorable.
          </p>
        </div>

        {/* Typographic Event List */}
        <div className="flex flex-col w-full relative">
          {/* Top master divider */}
          <div className="w-full h-[1px] bg-[#2E2925]/10 absolute top-0 left-0" />
          
          {eventsList.map((evt, idx) => (
            <EventRow 
              key={idx} 
              event={evt} 
              rowRef={(el) => (rowsRef.current[idx] = el)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default EventsWeHost;
