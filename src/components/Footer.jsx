import { MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-[#2E2925] text-[#E8E7E5] pt-[clamp(5rem,12vh,8rem)] pb-[clamp(2.5rem,6vh,4rem)] px-[clamp(1.5rem,5vw,6rem)] flex flex-col">
      <div className="w-full mx-auto max-w-[1400px]">
        
        {/* Top 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-12 mb-[clamp(4rem,10vh,7rem)] text-center md:text-left">
          
          {/* Left Column - Brand & Address */}
          <div className="lg:col-span-5 flex flex-col items-center md:items-start">
            <a href="/" className="uppercase text-lg md:text-xl tracking-[0.3em] font-light mb-6 opacity-90 hover:opacity-100 transition-opacity">
              Balaji Resort
            </a>
            <p className="text-[#E8E7E5]/70 font-light leading-relaxed max-w-[320px] mb-8 text-sm md:text-base">
              Crafting memorable celebrations, peaceful stays, and unforgettable experiences with timeless hospitality.
            </p>
            <div className="flex flex-col text-[#E8E7E5]/70 font-light leading-relaxed text-sm md:text-base mb-6">
              <span>NH-43, Main Road,</span>
              <span>Lawada, Tahsil Lalbarra,</span>
              <span>Dist. Balaghat - 481001 (M.P.)</span>
            </div>
            <a 
              href="https://maps.app.goo.gl/smQZUP6tfh2RBU6a9"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center pb-1 text-[11px] md:text-xs tracking-[0.15em] font-light uppercase text-[#E8E7E5] opacity-80 hover:opacity-100 transition-opacity"
            >
              Google Maps
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#E8E7E5]/30 origin-right transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
            </a>
          </div>

          {/* Center Column - Explore Links */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="font-['Cormorant_Garamond',_serif] text-2xl md:text-3xl text-[#E8E7E5] mb-8">
              Explore
            </h4>
            <ul className="flex flex-col space-y-5 text-center md:text-left items-center md:items-start">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Accommodation", href: "#accommodation" },
                { name: "Event Venues", href: "#event-venues" },
                { name: "Rooftop Pool Deck", href: "#rooftop" },
                { name: "Restaurant", href: "#restaurant" },
                { name: "Events We Host", href: "#events" },
                { name: "Contact", href: "#contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="group relative inline-flex pb-1 text-[13px] md:text-sm font-light text-[#E8E7E5]/70 hover:text-[#E8E7E5] transition-colors duration-500"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#E8E7E5]/20 origin-right transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact & Socials */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start lg:items-end">
            <h4 className="font-['Cormorant_Garamond',_serif] text-2xl md:text-3xl text-[#E8E7E5] mb-8">
              Contact
            </h4>
            <div className="flex flex-col space-y-5 mb-10 items-center md:items-start lg:items-end">
              <a 
                href="tel:+919343959783" 
                className="group relative inline-flex pb-1 text-[13px] md:text-sm font-light text-[#E8E7E5]/70 hover:text-[#E8E7E5] transition-colors duration-500"
              >
                +91 9343959783
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#E8E7E5]/20 origin-right transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
              </a>
              <a 
                href="mailto:balajilawnandrestaurant@gmail.com" 
                className="group relative inline-flex pb-1 text-[13px] md:text-sm font-light text-[#E8E7E5]/70 hover:text-[#E8E7E5] transition-colors duration-500 break-all lg:break-normal text-center md:text-left lg:text-right"
              >
                balajilawnandrestaurant@gmail.com
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#E8E7E5]/20 origin-right transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-6">
              <a href="#" className="text-[#E8E7E5]/60 hover:text-[#E8E7E5] transition-colors duration-500 transform hover:-translate-y-1" aria-label="Instagram">
                <FaInstagram size={19} />
              </a>
              <a href="#" className="text-[#E8E7E5]/60 hover:text-[#E8E7E5] transition-colors duration-500 transform hover:-translate-y-1" aria-label="Facebook">
                <FaFacebook size={19} />
              </a>
              <a href="https://maps.app.goo.gl/smQZUP6tfh2RBU6a9" target="_blank" rel="noopener noreferrer" className="text-[#E8E7E5]/60 hover:text-[#E8E7E5] transition-colors duration-500 transform hover:-translate-y-1" aria-label="Google Maps">
                <MapPin size={21} strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="w-full h-[1px] bg-[#E8E7E5]/10 mb-8" />

        {/* Bottom Bar Content */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] tracking-[0.1em] font-light text-[#E8E7E5]/50 gap-y-4">
          <span>&copy; 2026 Balaji Resort. All Rights Reserved.</span>
          <span>Designed with timeless hospitality.</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
