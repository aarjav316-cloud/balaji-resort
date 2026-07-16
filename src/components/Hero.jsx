import { useEffect, useState } from "react";
import heroVideo from "../assets/hero/herosectionB.mp4";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1400 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-5 md:px-12">
        <h2
          className={`hero-heading text-white text-center transition-all duration-1200 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Welcome to Balaji Resort
        </h2>
      </div>
    </section>
  );
};

export default Hero;
