import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import start from './assets/prizes.png';

const PRIZE_DATA = {
  WORKING_MODEL: {
    id: 'Hardware-Project',
    title: 'HARDWARE PROJECT',
    prizes: [
      { rank: '1st', amount: 'Rs.14,000/-' },
      { rank: '2nd', amount: 'Rs.7,000/-' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80',
    desc: "The premier category for hardware enthusiasts. Showcase physical prototypes that solve real-world engineering challenges through mechanics and electronics."
  },
  SOFTWARE: {
    id: 'Software-Project',
    title: 'SOFTWARE PROJECT',
    prizes: [
      { rank: '1st', amount: 'Rs.11,000/-' },
      { rank: '2nd', amount: 'Rs.5,000/-' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
    desc: "A battle of algorithms and architecture. This category focuses on clean code, UI/UX, and the deployment of scalable digital solutions."
  },
  PAPER: {
    id: 'Paper-Presentation',
    title: 'PAPER PRESENTATION',
    prizes: [
      { rank: '1st', amount: 'Rs.8,500/-' },
      { rank: '2nd', amount: 'Rs.4,500/-' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80',
    desc: "The intellectual core of the event. Present your research findings, theoretical breakthroughs, and academic papers to a panel of experts."
  },
};

const wipeVariants: Variants = {
  initial: { x: '100%', skewX: '-20deg' },
  animate: {
    x: '-150%',
    skewX: '-20deg',
    transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] }
  },
  exit: { x: '-150%', skewX: '-20deg' }
};

const Prizes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof PRIZE_DATA | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  // Add state to track window width for responsive animations
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (key: keyof typeof PRIZE_DATA | null) => {
    if (key === activeTab || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => { setActiveTab(key); }, 350);
    setTimeout(() => { setIsAnimating(false); }, 800);
  };

  return (
    <div className="relative w-full h-[110vh] lg:h-[110vh] overflow-hidden bg-[#0a0a0a] text-white uppercase font-black tracking-tighter select-none">

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab || 'landing'}
            initial={{ scale: 1.1, filter: 'grayscale(0%) opacity(0)' }}
            animate={{ scale: 1, filter: 'grayscale(0%) opacity(1)' }}
            exit={{ scale: 1.2, filter: 'opacity(0)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%), url(${start})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
      </div>

      {/* TRANSITION OVERLAY */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            key="screen-wipe"
            variants={wipeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 z-[100] bg-white w-[200vw] h-[100vh] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* UI LAYER */}
      <div className="relative z-50 flex flex-col justify-center lg:justify-normal lg:grid lg:grid-cols-12 h-full overflow-y-auto lg:overflow-hidden">
        {/* Left Panel - Dynamic Scaling Container */}
        {/* Mobile: Hidden when activeTab is set. Desktop: Always visible */}
        <div className={`w-full lg:col-span-3 flex flex-col justify-center px-8 lg:pt-0 lg:pl-12 lg:pr-0 font-pricedown shrink-0 h-full ${activeTab ? 'hidden lg:flex' : 'flex'}`}>
          <motion.div
            animate={{
              // Mobile: Always 1. Desktop: Previous logic
              scale: isMobile ? 1 : 1.5,
              x: isMobile ? 0 : (activeTab ? 0 : 100),
              transformOrigin: "left center"
            }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="space-y-4 w-full flex flex-col items-center lg:items-start"
          >
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="mb-12 lg:mb-10 text-center lg:text-left">
              <p className="text-purple-600 text-xxs lg:text-xxxs tracking-[0.2em] font-bold">PRAKALPA'26</p>
              <h1 className="text-7xl lg:text-6xl leading-[0.85] mt-2 italic transform -skew-x-6">PROJECT CATEGORY<br />PRIZES</h1>
            </motion.div>

            <nav className="flex flex-col space-y-6 lg:space-y-3 items-center lg:items-start w-full">
              {(Object.keys(PRIZE_DATA) as Array<keyof typeof PRIZE_DATA>).map((key) => (
                <button
                  key={key}
                  onClick={() => handleNavigation(key)}
                  className={`text-3xl lg:text-3xl italic transition-all duration-300 transform hover:scale-110 lg:hover:translate-x-3 w-full lg:w-auto text-center lg:text-left ${activeTab === key ? 'text-white' : 'text-white lg:text-zinc-500 hover:text-center hover:text-white'}`}
                >
                  {PRIZE_DATA[key].id.replace('-', ' ')}
                </button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Center Panel */}
        {/* Mobile: Hidden when NO activeTab. Desktop: Always visible (content handles opacity) */}
        <div className={`w-full lg:col-span-6 flex flex-col justify-start lg:justify-center items-center font-pricedown py-4 lg:py-0 h-auto lg:h-full overflow-hidden lg:overflow-visible ${!activeTab ? 'hidden lg:flex' : 'flex'}`}>
          <AnimatePresence mode="wait">
            {activeTab && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col items-center text-center mt-4 lg:mt-0 w-full"
              >
                <h2 className="text-5xl lg:text-[7rem] italic leading-[0.75] mb-8 lg:mb-12 -skew-x-12 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {PRIZE_DATA[activeTab].title}
                </h2>

                <div className="space-y-4 lg:space-y-6 w-full flex flex-col items-center">
                  {PRIZE_DATA[activeTab].prizes.map((p, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="flex items-center justify-center space-x-2 lg:space-x-5 group w-full"
                    >
                      <div className="bg-amber-400 text-black px-6 py-1 lg:px-10 lg:py-2 text-3xl lg:text-5xl -skew-x-12 font-black italic group-hover:bg-white transition-colors">
                        {p.rank}
                      </div>
                      <div className="text-4xl lg:text-7xl font-black tracking-closest group-hover:text-amber-400 transition-colors">
                        {p.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => handleNavigation(null)}
                  className="mt-4 lg:mt-20 group flex items-center gap-3 text-zinc-500 hover:text-white transition-all transform hover:-translate-x-1"
                >
                  <span className="text-2xl lg:text-4xl font-black italic tracking-tighter">BACK</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - Description */}
        {/* Mobile: Visible IF activeTab. Desktop: Always visible. */}
        <div className={`w-full lg:col-span-3 flex flex-col justify-start lg:justify-center px-8 pb-12 lg:pr-12 lg:pb-0 pt-0 ${!activeTab ? 'hidden lg:flex' : 'flex'}`}>
          <AnimatePresence mode="wait">
            {activeTab && (
              <motion.div
                key={`desc-${activeTab}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeOut"
                }}
                className="bg-black/60 backdrop-blur-md p-6 lg:p-8 border-l-[6px] border-purple-400 transform -skew-x-2 shadow-2xl mt-0 lg:mt-0"
              >
                <p className="text-purple-400 text-xs mb-3 tracking-[0.2em] font-bold">MISSION BRIEF</p>
                <p className="text-base font-medium tracking-normal normal-case leading-relaxed text-zinc-100 italic">
                  "{PRIZE_DATA[activeTab].desc}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Prizes;