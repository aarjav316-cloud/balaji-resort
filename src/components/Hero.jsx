import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/hero/herosectionB.mp4";

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax configuration — centralised for easy tuning.
 * Values are intentionally restrained to feel cinematic, not gimmicky.
 * yPercent keeps motion proportional across screen sizes automatically.
 */
const PARALLAX = {
  video: { yPercent: 15 },   // video drifts DOWN slowly — viewer perceives depth
  text:  { yPercent: -25, opacity: 0 }, // text lifts UP and fades — exits elegantly
};

const Hero = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shared = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,            // perfectly synced with scroll
        },
      };

      // Video parallax — moves slower than scroll, creating depth
      gsap.to(videoRef.current, {
        yPercent: PARALLAX.video.yPercent,
        ease: "none",
        ...shared,
      });

      // Text parallax — drifts up gently + fades as hero scrolls away
      gsap.to(contentRef.current, {
        yPercent: PARALLAX.text.yPercent,
        opacity: PARALLAX.text.opacity,
        ease: "none",
        ...shared,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-navbar-theme="dark"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Video — scaled up slightly so parallax shift never reveals edges */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center px-5 md:px-12 will-change-transform"
      >
        <h2 className="hero-heading text-white text-center">
          Welcome to Balaji Resort
        </h2>
      </div>
    </section>
  );
};

export default Hero;
