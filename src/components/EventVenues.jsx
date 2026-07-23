import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import grandBallroomImg from "../assets/events/grandballroom.avif";
import banquetHallImg from "../assets/events/banquethall.avif";
import miniBanquetImg from "../assets/events/minibanquethall.avif";
import royalLawnImg from "../assets/events/royallawn.avif";

gsap.registerPlugin(ScrollTrigger);

const eventVenues = [
  {
    id: "grand-ballroom",
    title: "Grand Ballroom",
    desc: "Elegant celebrations with grandeur",
    image: grandBallroomImg,
  },
  {
    id: "banquet-hall",
    title: "Banquet Hall",
    desc: "Perfect for memorable gatherings",
    image: banquetHallImg,
  },
  {
    id: "mini-banquet",
    title: "Mini Banquet Hall",
    desc: "Ideal for intimate celebrations",
    image: miniBanquetImg,
  },
  {
    id: "royal-lawn",
    title: "Royal Lawn",
    desc: "Open-air luxury celebrations",
    image: royalLawnImg,
  },
];

function VenueCard({ venue, cardRef }) {
  return (
    <div 
      ref={cardRef}
      className="group cursor-pointer flex flex-col opacity-0 will-change-transform"
    >
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden mb-6">
        <img 
          src={venue.image} 
          alt={venue.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 ease-out group-hover:bg-black/5" />
      </div>

      <div className="flex flex-col">
        <h3 className="font-['Cormorant_Garamond',_serif] text-2xl md:text-3xl text-[#2E2925] mb-2 transition-colors duration-700 group-hover:text-black">
          {venue.title}
        </h3>
        <p className="text-sm md:text-base font-light tracking-wide text-[#2E2925]/70 transition-opacity duration-700 group-hover:opacity-100 opacity-80">
          {venue.desc}
        </p>
      </div>
    </div>
  );
}

function EventVenues() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

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
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4 }
      );

      const validCards = cardsRef.current.filter(Boolean);
      
      tl.fromTo(
        validCards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.15 
        },
        "-=0.8" 
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      data-navbar-theme="light"
      className="w-full bg-[#E8E7E5] text-[#2E2925] pt-[clamp(3rem,7.5vh,6rem)] pb-[clamp(3rem,7.5vh,6rem)] px-[clamp(1.5rem,5vw,6rem)]"
    >
      <div className="w-full mx-auto max-w-[1400px]">
        
        <div ref={headerRef} className="flex flex-col items-center text-center opacity-0 mb-16 md:mb-24">
          <span className="uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-light mb-6">
            Event Venues
          </span>
          <h2 className="font-['Cormorant_Garamond',_serif] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.1] font-light tracking-tight">
            Celebrate Every Occasion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 md:gap-x-12 lg:gap-x-20">
          {eventVenues.map((venue, index) => (
            <VenueCard 
              key={venue.id} 
              venue={venue} 
              cardRef={(el) => (cardsRef.current[index] = el)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default EventVenues;
