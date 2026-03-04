import React from "react";
import IsteLogo from "./assets/ISTE_logo.png"; // Placeholder image

// Placeholder data for sponsors
const SPONSORS = [
  { id: 1, name: "Sponsor 1", logo: IsteLogo },
  { id: 2, name: "Sponsor 2", logo: IsteLogo },
  { id: 3, name: "Sponsor 3", logo: IsteLogo },
  { id: 4, name: "Sponsor 4", logo: IsteLogo },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SPONSORS.map((sponsor) => (
            <div
              key={sponsor.id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-white/2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300"
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
