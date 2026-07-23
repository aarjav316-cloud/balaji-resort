import restaurantImg from "../assets/restaurant/photo-1517248135467-4c7edcad34c4.avif";

function SignatureRestaurant() {
  return (
    <section 
      data-navbar-theme="light"
      className="w-full bg-[#E8E7E5] text-[#2E2925] pt-[clamp(3rem,7.5vh,6rem)] pb-[clamp(3rem,7.5vh,6rem)] px-[clamp(1.5rem,5vw,6rem)]"
    >
      <div className="w-full mx-auto max-w-[1500px]">
        
        {/* Immersive Cinematic Container */}
        <div 
          className="group relative w-full aspect-[8/10] sm:aspect-[4/3] lg:aspect-[21/9] overflow-hidden"
        >
          {/* Static Image Strategy: Matches RooftopPool layout, including image hover transition */}
          <img 
            src={restaurantImg}
            alt="Signature Restaurant"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-[1.025] group-hover:brightness-105 group-hover:contrast-105"
          />

          {/* Highly Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-black/35 pointer-events-none transition-colors duration-[2s] ease-out group-hover:bg-black/25" />

          {/* Centered Text Layer */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 z-10 text-white"
          >
            <div className="max-w-[800px] flex flex-col items-center">
              
              <span 
                className="uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-light mb-8 md:mb-10"
              >
                Culinary Experience
              </span>
              
              <h2 
                className="font-['Cormorant_Garamond',_serif] text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] leading-[1.1] font-light tracking-tight mb-8 md:mb-10 drop-shadow-md"
              >
                Signature Restaurant
              </h2>
              
              <p 
                className="text-base md:text-lg lg:text-[1.2rem] font-light leading-relaxed md:leading-[1.9] text-white/95 max-w-[700px]"
              >
                Experience exceptional dining in an elegant setting where carefully prepared cuisine, warm hospitality, and refined interiors come together to create memorable moments. From intimate dinners to family celebrations, every meal is crafted with quality, comfort, and timeless sophistication.
              </p>

            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default SignatureRestaurant;
