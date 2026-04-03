  import React from "react";
import IsteLogo from "./assets/ISTE_logo.png"; // Placeholder image
import VybexLogo from "./assets/sponsor_images/vybex_clothing.png";
import Web3Logo from "./assets/sponsor_images/web3_aligarh_community.png";
// Placeholder data for sponsors
  const SPONSORS = [
    { id: 1, name: "vybex_clothing", logo: VybexLogo },
    { id: 2, name: "web3_aligarh_community", logo: Web3Logo },
    // { id: 3, name: "", logo: IsteLogo },
    // { id: 4, name: "Sponsor 4", logo: IsteLogo },
  ];

export default function Sponsors() {
  return (
    <section className="relative w-full bg-gradient-to-b from-zinc-950 to-black text-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-16">
          <h2
            className="text-white text-5xl md:text-7xl font-black tracking-wider transform -skew-x-12 text-center"
            style={{
              fontFamily: 'pricedown, sans-serif',
              textShadow: `
                4px 4px 0px #ec4899,
                -1px -1px 0px rgba(0,0,0,0.5),
                5px 5px 15px rgba(0,0,0,0.8)
              `
            }}
          >
            SPONSORS
          </h2>
        </div>

        {/* Sponsor Grid */}
        <div className="flex flex-wrap justify-center gap-20 w-full">
  {SPONSORS.map((sponsor) => (
    <div
      key={sponsor.id}
      className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-white/2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 flex-1 min-w-[200px] max-w-[300px]"
    >
              <div className="w-32 h-32 relative flex items-center justify-center">
                {/* Image Container */}
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
