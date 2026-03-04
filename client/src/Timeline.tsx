import React, { useState, useEffect, useRef } from 'react';
import NewT from './assets/gallery_images/NewT.png';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const items: TimelineItem[] = [
    {
      id: 1,
      title: 'HEIST PLANNING',
      date: 'WEEK 1',
      description: 'Assembled the crew and scoped out the target. Intel gathered on security systems and escape routes.',
    },
    {
      id: 2,
      title: 'CREW ASSEMBLY',
      date: 'WEEK 2',
      description: 'Recruited specialists: demolitions expert, hacker, and getaway driver. Equipment procurement in progress.',
    },
    {
      id: 3,
      title: 'RECONNAISSANCE',
      date: 'WEEK 3',
      description: 'Detailed surveillance complete. Security patterns documented. Blueprints acquired from inside source.',
    },
    {
      id: 4,
      title: 'THE SETUP',
      date: 'WEEK 4',
      description: 'Vehicles prepared. Weapons cache secured. Final walkthrough completed. All systems go.',
    },
    {
      id: 5,
      title: 'EXECUTION',
      date: 'WEEK 5',
      description: 'Mission accomplished. Target secured. Clean getaway achieved. Payout distributed to crew.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = parseInt(entry.target.getAttribute('data-id') || '0');
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id));
          } else {
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    );

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          
          @font-face {
            font-family: 'Pricedown';
            src: url('/fonts/pricedown.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }

          .gta-title {
            font-family: 'Inter', sans-serif;
            letter-spacing: 3px;
          }

          .gta-text {
            font-family: 'Inter', sans-serif;
          }

          .mission-timeline-text {
            font-family: 'Pricedown', sans-serif;
            font-size: 3rem;
            line-height: 1;
            font-weight: 900;
            letter-spacing: 0.05em;
            color: rgb(255 255 255);
            text-transform: uppercase;
            display: block;
            width: 100%;
            transform: skewX(-12deg);
            text-shadow: 
              rgb(236, 72, 153) 4px 4px 0px, 
              rgba(0, 0, 0, 0.5) -1px -1px 0px, 
              rgba(0, 0, 0, 0.8) 5px 5px 15px;
          }

          @media (min-width: 768px) {
            .mission-timeline-text {
              font-size: 5rem;
            }
          }


        `}
      </style>
      <div
  className="min-h-screen py-8 md:py-16 px-4 relative overflow-hidden"
  style={{
    backgroundImage: `url(${NewT})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}
>
        {/* Vice City Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        <div className="max-w-5xl mx-auto relative z-10">
  <div className="flex justify-center mb-8 md:mb-12 w-full">
    <h1 className="mission-timeline-text w-full text-center">MISSION TIMELINE</h1>
  </div>
  
          <div className="relative">
            {/* Neon Center Line - Desktop centered, Mobile left-aligned */}
            <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full" style={{
              background: '#ff006e',
              boxShadow: '0 0 12px rgba(255, 0, 110, 0.6), 0 0 24px rgba(255, 0, 110, 0.3)'
            }}></div>
            {items.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => { itemRefs.current[item.id] = el; }}
                data-id={item.id}
                className={`relative flex items-center mb-12 md:mb-20 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Mobile: Full width with left alignment, Desktop: Half width alternating */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div
                    className={`w-full md:w-11/12 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} transition-all duration-700 ${
                      visibleItems.has(item.id)
                        ? 'opacity-100 translate-x-0 rotate-0'
                        : 'opacity-0 -translate-x-10 md:-translate-x-20'
                    }`}
                  >
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl p-4 md:p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg relative overflow-hidden">
                      

                      
                      <div className="text-xs font-bold text-cyan-400 mb-2 gta-text tracking-widest bg-purple-900/50 px-3 py-1 inline-block rounded">
                        {item.date}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-pink-500 mb-2 md:mb-3 gta-title tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed gta-text">{item.description}</p>
                      
                      {/* Wanted stars indicator */}
                      <div className="flex gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i < item.id ? 'bg-yellow-400' : 'bg-gray-700'}`} style={{
                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                          }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for desktop alternating layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
      </div>
    </>
  );
};

export default Timeline;