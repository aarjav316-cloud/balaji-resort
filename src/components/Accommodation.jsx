import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import deluxeRoomImg from "../assets/rooms/Deluxerooms.avif";
import premiumDeluxeImg from "../assets/rooms/premiumdeluxeroom.avif";
import executiveSuiteImg from "../assets/rooms/executivesuite.avif";
import presidentialSuiteImg from "../assets/rooms/presedentialsuite.avif";
import dormitoryImg from "../assets/rooms/dormitory.avif";

gsap.registerPlugin(ScrollTrigger);

const premiumRooms = [
  {
    id: "deluxe",
    title: "Deluxe Room",
    price: "Starting from ₹4,999 / night",
    desc: "An elegant retreat designed for perfect relaxation.",
    image: deluxeRoomImg,
  },
  {
    id: "premium-deluxe",
    title: "Premium Deluxe Room",
    price: "Starting from ₹6,499 / night",
    desc: "Enhanced space with premium amenities and elevated comfort.",
    image: premiumDeluxeImg,
  },
  {
    id: "executive-suite",
    title: "Executive Suite",
    price: "Starting from ₹9,999 / night",
    desc: "Generous living areas tailored for both business and leisure.",
    image: executiveSuiteImg,
  },
  {
    id: "presidential-suite",
    title: "Presidential Suite",
    price: "Starting from ₹14,999 / night",
    desc: "The pinnacle of luxury hospitality with bespoke services.",
    image: presidentialSuiteImg,
  },
];

const dormitoryRooms = [
  {
    id: "dormitory",
    title: "Luxury Dormitory",
    price: "Starting from ₹1,499 / night per bed",
    desc: "Comfortable, spacious shared accommodation ideal for group events.",
    image: dormitoryImg,
  },
];

function RoomCard({ room, cardRef }) {
  return (
    <div 
      ref={cardRef}
      className="group cursor-pointer flex flex-col opacity-0 will-change-transform"
    >
      {/* 
        Image Wrapper 
        Enforces landscape constraint and handles the overflow for the hover scale.
      */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden mb-6">
        <img 
          src={room.image} 
          alt={room.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        {/* Subtle overlay that darkens very slightly on hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 ease-out group-hover:bg-black/5" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <h3 className="font-['Cormorant_Garamond',_serif] text-2xl md:text-3xl text-[#2E2925] mb-2 transition-colors duration-700 group-hover:text-black">
          {room.title}
        </h3>
        <p className="text-sm md:text-base font-light tracking-wide text-[#2E2925]/70 mb-3">
          {room.price}
        </p>
        <p className="text-sm md:text-base font-light leading-relaxed text-[#2E2925]/80 transition-opacity duration-700 group-hover:opacity-100 opacity-80">
          {room.desc}
        </p>
      </div>
    </div>
  );
}

function Accommodation() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  // Setup GSAP scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Starts when top of section is 75% down viewport
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Reveal Section Header
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4 }
      );

      // 2. Reveal Cards progressively
      // Use filter boolean just in case refs are missing
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
        "-=0.8" // start slightly before header finishes
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
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center opacity-0 mb-16 md:mb-24">
          <span className="uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-light mb-6">
            Accommodation
          </span>
          <h2 className="font-['Cormorant_Garamond',_serif] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.1] font-light tracking-tight">
            Choose Your Perfect Stay
          </h2>
        </div>

        {/* Premium Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 md:gap-x-12 lg:gap-x-20">
          {premiumRooms.map((room, index) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              cardRef={(el) => (cardsRef.current[index] = el)} 
            />
          ))}
        </div>

        {/* Dormitory Separator (Optional extra space if needed to detach from luxury rooms) */}
        <div className="mt-24 md:mt-32 pt-16 md:pt-24 border-t border-[#2E2925]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-x-12 lg:gap-x-20 items-center">
            {dormitoryRooms.map((room, index) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                cardRef={(el) => (cardsRef.current[premiumRooms.length + index] = el)} 
              />
            ))}
            
            {/* Context for dormitory adjacent to its card */}
            <div className="flex flex-col justify-center px-0 md:px-8 lg:px-12 opacity-0" ref={(el) => (cardsRef.current[premiumRooms.length + dormitoryRooms.length] = el)}>
              <h3 className="font-['Cormorant_Garamond',_serif] text-3xl md:text-4xl text-[#2E2925] mb-6">
                Group Events & Gatherings
              </h3>
              <p className="text-base md:text-lg font-light leading-relaxed text-[#2E2925]/80 mb-8">
                For grand celebrations, corporate retreats, and large family gatherings, our luxury dormitory provides immaculate, spacious accommodations designed for communal convenience without compromising on comfort.
              </p>
              <div className="flex justify-start">
                <a 
                  href="/contact" 
                  className="group relative inline-flex pb-2 text-[11px] md:text-xs tracking-[0.2em] font-light uppercase text-[#2E2925]"
                >
                  Inquire for Groups
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#2E2925]/40 origin-right transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Accommodation;
