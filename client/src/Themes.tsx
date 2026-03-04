import { useState, useEffect } from 'react';

// Utility function
const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(' ');
};

// ADD THESE ICON COMPONENTS:
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const Share2Icon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MoreVerticalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

// Background image placeholder - you can replace this URL with your actual image
import bgImage from './assets/Themes_Images/image.png';

const themes = [
  {
    id: 'ai-ml',
    title: 'AI/ML',
    description: 'Artificial Intelligence and Machine Learning',
    details: 'Explore the frontiers of artificial intelligence and machine learning. Build intelligent systems that can learn, adapt, and make decisions. From neural networks to deep learning, dive into the technologies shaping our future.',
    examples: [
      'Neural Network Architectures',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'Reinforcement Learning'
    ],
    color: 'from-purple-600 to-purple-800',
    image: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njg2Mzc3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    position: { top: '13%', left: '3%', width: '20%', height: '35%', rotate: -2 },
    galleryImages: [
      'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1719550371336-7bb64b5cacfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1484662020986-75935d2ebc66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'blockchain',
    title: 'BLOCKCHAIN',
    description: 'Decentralized Technologies',
    details: 'Revolutionize industries with blockchain technology. Create secure, transparent, and decentralized solutions using distributed ledger technology, smart contracts, and cryptocurrency protocols.',
    examples: [
      'Smart Contracts',
      'DeFi Applications',
      'NFT Platforms',
      'Supply Chain Solutions',
      'Cryptocurrency Wallets'
    ],
    color: 'from-purple-700 to-purple-900',
    image: 'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    position: { top: '11%', left: '25%', width: '18%', height: '32%', rotate: 1 },
    galleryImages: [
      'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1659010878130-ae8b703bd3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'agrotech',
    title: 'AGROTECH',
    description: 'Agricultural Technology',
    details: 'Transform agriculture with cutting-edge technology. Develop solutions for precision farming, crop monitoring, sustainable practices, and food security using IoT, AI, and data analytics.',
    examples: [
      'Precision Farming Systems',
      'Crop Health Monitoring',
      'Smart Irrigation',
      'Yield Prediction',
      'Farm Management Software'
    ],
    color: 'from-purple-600 to-purple-800',
    image: 'https://images.unsplash.com/photo-1688677825986-4ffb926bafc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    position: { top: '59%', left: '2%', width: '22%', height: '32%', rotate: -1 },
    galleryImages: [
      'https://images.unsplash.com/photo-1688677825986-4ffb926bafc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'game-dev',
    title: 'GAME DEV',
    description: 'Interactive Gaming Experiences',
    details: 'Create immersive gaming experiences that captivate players. Build games using modern engines, physics simulations, and engaging narratives across platforms.',
    examples: [
      '3D Game Engines',
      'AR/VR Gaming',
      'Multiplayer Systems',
      'Game Physics',
      'Procedural Generation'
    ],
    color: 'from-purple-600 to-purple-800',
    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    position: { top: '13%', left: '75%', width: '20%', height: '29%', rotate: 2 },
    galleryImages: [
      'https://images.unsplash.com/photo-1556438064-2d7646166914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'cybersecurity',
    title: 'CYBER-SECURITY',
    description: 'Digital Security Solutions',
    details: 'Protect the digital world with advanced cybersecurity solutions. Design systems to detect threats, prevent attacks, and secure data in an increasingly connected world.',
    examples: [
      'Threat Detection Systems',
      'Encryption Protocols',
      'Penetration Testing Tools',
      'Security Analytics',
      'Zero Trust Architecture'
    ],
    color: 'from-purple-700 to-purple-900',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',    
    position: { top: '45%', left: '26%', width: '21%', height: '33%', rotate: -2 },
    galleryImages: [
      'https://images.unsplash.com/photo-1660644807804-ffacfd7a4137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1477039181047-efb4357d01bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'autonomous-vehicles',
    title: 'AUTONOMOUS VEHICLES',
    description: 'Self-Driving Technology',
    details: 'Pioneer the future of transportation with autonomous vehicle technology. Develop systems for navigation, object detection, and decision-making for self-driving cars.',
    examples: [
      'Path Planning Algorithms',
      'Sensor Fusion',
      'Object Detection',
      'LIDAR Processing',
      'V2X Communication'
    ],
    color: 'from-purple-700 to-purple-900',
    image: 'https://images.unsplash.com/photo-1650699060603-5636741760d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    position: { top: '81%', left: '26%', width: '22%', height: '15%', rotate: 1 },
    galleryImages: [
      'https://images.unsplash.com/photo-1650699060603-5636741760d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1491921125492-f0b9c835b699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'robotics',
    title: 'ROBOTICS',
    description: 'Robotic Systems and Automation',
    details: 'Design and build intelligent robotic systems. Create solutions for automation, human-robot interaction, and autonomous systems across various domains.',
    examples: [
      'Robotic Process Automation',
      'Humanoid Robotics',
      'Swarm Intelligence',
      'Industrial Automation',
      'Collaborative Robots'
    ],
    color: 'from-purple-600 to-purple-800',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',    
    position: { top: '11%', left: '48%', width: '23%', height: '35%', rotate: -1 },
    galleryImages: [
      'https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'iot',
    title: 'IOT',
    description: 'Connected Smart Devices',
    details: 'Connect the physical and digital worlds through IoT. Build smart systems that collect, analyze, and act on data from interconnected devices.',
    examples: [
      'Smart Home Systems',
      'Industrial IoT',
      'Wearable Devices',
      'Environmental Monitoring',
      'Edge Computing'
    ],
    color: 'from-purple-700 to-purple-900',
    image: 'https://images.unsplash.com/photo-1553341640-9397992456f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    position: { top: '49%', left: '50%', width: '20%', height: '32%', rotate: 2 },
    galleryImages: [
      'https://images.unsplash.com/photo-1553341640-9397992456f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'cloud-computing',
    title: 'CLOUD',
    description: 'Scalable Cloud Solutions',
    details: 'Leverage cloud infrastructure to build scalable, reliable applications. Master containerization, serverless architecture, and distributed systems.',
    examples: [
      'Microservices Architecture',
      'Container Orchestration',
      'Serverless Applications',
      'Cloud-Native Development',
      'Distributed Databases'
    ],
    color: 'from-purple-600 to-purple-800',
    image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    position: { top: '84%', left: '49%', width: '22%', height: '14%', rotate: -1 },
    galleryImages: [
      'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1506399309177-3b43e99fead2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'biotechnology',
    title: 'BIOTECH',
    description: 'Bio-Engineering Solutions',
    details: 'Merge biology with technology to solve real-world problems. Develop solutions in bioinformatics, genetic engineering, and healthcare innovation.',
    examples: [
      'Genomic Analysis',
      'Protein Modeling',
      'Bioinformatics Tools',
      'Drug Discovery',
      'Biomedical Imaging'
    ],
    color: 'from-purple-700 to-purple-900',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',    
    position: { top: '44%', left: '73%', width: '20%', height: '25%', rotate: 1 },
    galleryImages: [
      'https://images.unsplash.com/photo-1668511237388-404cc7e56e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1580795479025-93d13fd9aa6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'others',
    title: 'OTHERS',
    description: 'Innovative Ideas Beyond Categories',
    details: 'Think outside the box! Bring your unique ideas that don\'t fit traditional categories. Innovation knows no bounds.',
    examples: [
      'Cross-Domain Solutions',
      'Novel Applications',
      'Experimental Technologies',
      'Interdisciplinary Projects',
      'Future Tech Concepts'
    ],
    color: 'from-purple-600 to-purple-800',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',    
    position: { top: '72%', left: '74%', width: '19%', height: '24%', rotate: -2 },
    galleryImages: [
      'https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1756908992154-c8a89f5e517f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  }
];

// ThemeDetailsModal Component
function ThemeDetailsModal({ theme, onClose }: { theme: any; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (theme) {
      setCurrentImageIndex(0);
    }
  }, [theme]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.history.replaceState(null, '', window.location.pathname);
        onClose();
      }
    };

    if (theme) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [theme, onClose]);

  useEffect(() => {
    if (theme) {
      if (window.location.hash !== `#${theme.id}`) {
        window.history.pushState(null, '', `#${theme.id}`);
      }
    }
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => {
      if (theme && window.location.hash === '') {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [theme, onClose]);

  if (!theme) return null;

  const galleryImages = theme.galleryImages || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col" style={{ fontFamily: 'Orbitron, sans-serif' }}>
      {/* Background Image */}
      <img 
        src={bgImage} 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Vice City Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-pink-900/80 to-black/80" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, purple 2px, purple 4px)',
           }} />

      {/* Main Content */}
      <div className="relative flex-1 flex items-start justify-center overflow-y-auto pt-16 sm:pt-20 pb-8 px-4 sm:px-6">
        {/* Close Button */}
        <button
          onClick={() => {
            window.history.replaceState(null, '', window.location.pathname);
            onClose();
          }}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 text-purple-400 hover:text-pink-400 transition-all duration-300 bg-black/60 backdrop-blur-sm rounded-sm p-2 border-2 border-purple-500/30 hover:border-pink-500"
        >
          <XIcon />
        </button>

        {/* Content Area */}
        <div className="relative w-full flex items-center justify-center">
          <div className="max-w-5xl w-full">
            {/* Image Preview */}
            <div className="relative rounded-sm overflow-hidden mb-6 border-4 border-pink-500/60 shadow-xl transform -rotate-1">
              <img
                src={theme.image}
                alt={theme.title}
                className="w-full h-[250px] sm:h-[350px] md:h-[420px] object-cover"
              />
              
              {/* Overlay with theme title */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-pink-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 sm:mb-3 tracking-wider transform -skew-x-12"
                      style={{ 
                        fontFamily: 'pricedown, sans-serif',
                        textShadow: `
                          3px 3px 0px rgba(168,85,247,0.7),
                          -1px -1px 0px rgba(236,72,153,0.4),
                          4px 4px 10px rgba(0,0,0,0.9)
                        `
                      }}>
                    {theme.title}
                  </h1>
                  <p className="text-purple-400 text-base sm:text-xl md:text-2xl font-black tracking-wide"
                     style={{ 
                       fontFamily: 'Orbitron, sans-serif',
                       textShadow: '2px 2px 6px rgba(0,0,0,0.9)'
                     }}>
                    {theme.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Theme Details */}
            <div className="bg-black/60 backdrop-blur-sm rounded-sm p-4 sm:p-6 md:p-8 border-2 border-purple-500/40 shadow-lg transform rotate-1">
              <h3 className="text-pink-400 text-2xl sm:text-3xl font-black mb-3 sm:mb-4 tracking-wider transform -skew-x-6"
                  style={{ 
                    fontFamily: 'pricedown, sans-serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                  }}>
                &gt;&gt; ABOUT THIS THEME
              </h3>
              <p className="text-purple-200 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed font-medium"
                 style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {theme.details}
              </p>

              <h4 className="text-pink-400 text-xl sm:text-2xl font-black mb-3 sm:mb-4 tracking-wider transform -skew-x-6"
                  style={{ 
                    fontFamily: 'pricedown, sans-serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                  }}>
                &gt;&gt; KEY AREAS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {theme.examples.map((example: string, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-400/30 rounded-sm px-3 sm:px-4 py-2 sm:py-3 hover:border-pink-500 hover:from-purple-800/50 hover:to-pink-800/50 transition-all duration-300 shadow-md transform hover:-rotate-1"
                  >
                    <p className="text-purple-300 text-sm sm:text-base font-bold tracking-wide"
                       style={{ 
                         fontFamily: 'Orbitron, sans-serif',
                         textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                       }}>
                      &gt; {example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ThemesSection Component
function ThemesSection() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // iPad Pro portrait (1024px) and below use grid layout
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const currentScroll = window.scrollY;
      
      const hash = window.location.hash.slice(1);
      if (hash && !selectedTheme) {
        window.history.replaceState(null, '', window.location.pathname);
        window.scrollTo(0, currentScroll);
      } else if (!hash && selectedTheme) {
        setSelectedTheme(null);
        window.scrollTo(0, currentScroll);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [selectedTheme]);

  return (
    <>
      <div className="w-full relative">
        {/* Title Overlay - Responsive */}
        <div className="absolute top-[35px] sm:top-[10px] md:top-[-5px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none px-4">
          <div className="relative">
            <h1 className="text-pink-500 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider transform -skew-x-12"
                style={{ 
                  fontFamily: 'pricedown, sans-serif',
                  textShadow: `
                    3px 3px 0px rgba(168,85,247,0.8),
                    -1px -1px 0px rgba(236,72,153,0.5),
                    5px 5px 15px rgba(0,0,0,0.8)
                  `
                }}>
              THEMES
            </h1>
          </div>
        </div>

        {/* Mobile: Grid Layout with tilted cards */}
        {isMobile ? (
          <div className="relative px-4 py-16">
            {/* Background Image for Mobile - extends with content */}
            <div 
              className="absolute top-0 left-0 right-0 bottom-0 w-full"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%), url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Purple gradient overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full bg-gradient-to-b from-purple-950/20 via-transparent to-black/30" />
            
            {/* Grid Content with tilted cards */}
            <div className="relative grid grid-cols-2 gap-4 mt-12 px-2 pb-8">
              {themes.map((theme: any, index: number) => {
                const isLastOdd = index === themes.length - 1 && themes.length % 2 !== 0;
                
                return (
                  <div
                    key={theme.id}
                    className={isLastOdd ? "col-span-2 flex justify-center" : ""}
                  >
                    <button
                      onClick={() => setSelectedTheme(theme)}
                      className="relative aspect-square group cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 border-2 border-black hover:border-pink-500 shadow-lg rounded-sm overflow-hidden w-full"
                      style={{
                        transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                        maxWidth: isLastOdd ? 'calc(50% - 0.5rem)' : '100%',
                      }}
                    >
                  {/* Background Image */}
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Purple Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600/60 via-purple-600/70 to-fuchsia-600/60 opacity-75 group-hover:opacity-50 transition-opacity duration-300 mix-blend-multiply" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-3 text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide group-hover:text-pink-400 transition-colors duration-300 transform -rotate-2 text-purple-200 font-black"
                        style={{ 
                          fontFamily: 'pricedown, sans-serif',
                          textShadow: '2px 2px 0px rgba(0,0,0,0.9), 0 0 8px rgba(168,85,247,0.6)'
                        }}>
                      {theme.title}
                    </h3>
                  </div>
                </button>
              </div>
            );
          })}
            </div>
          </div>
        ) : (
          /* Desktop: Collage Layout */
          <div className="relative h-[1050px] border-2 border-pink-500/40 overflow-hidden">
            {/* Vice City Background */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%), url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-black/30" />
            
            {/* Theme Cards */}
            {themes.map((theme: any) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                style={{ 
                  position: 'absolute',
                  top: theme.position.top,
                  left: theme.position.left,
                  width: theme.position.width,
                  height: theme.position.height,
                  transform: `rotate(${theme.position.rotate}deg)`,
                }}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-30 hover:rotate-0 border-2 border-black hover:border-pink-500 shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
              >
                {/* Background Image */}
                <img
                  src={theme.image}
                  alt={theme.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Purple Color Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/60 via-purple-600/70 to-fuchsia-600/60 opacity-75 group-hover:opacity-50 transition-opacity duration-300 mix-blend-multiply" />
                
                {/* Subtle Glow on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_20px_rgba(168,85,247,0.5)]" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-4 text-left">
                  <h3 className="text-purple-200 font-black text-xl tracking-wide group-hover:text-pink-400 transition-colors duration-300 transform -rotate-2"
                      style={{ 
                        fontFamily: 'pricedown, sans-serif',
                        textShadow: `
                          2px 2px 0px rgba(0,0,0,0.9),
                          0 0 8px rgba(168,85,247,0.6)
                        `
                      }}>
                    {theme.title}
                  </h3>
                  <p className="text-pink-300 text-xs mt-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ 
                       fontFamily: 'Orbitron, sans-serif',
                       textShadow: '1px 1px 3px rgba(0,0,0,0.9)'
                     }}>
                    &gt; CLICK TO EXPLORE
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <ThemeDetailsModal
        theme={selectedTheme}
        onClose={() => setSelectedTheme(null)}
      />
    </>
  );
}

// Main App Component
export default function App() {
  
  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: 'Orbitron, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
        @font-face {
          font-family: 'Pricedown';
          src: url('https://cdn.jsdelivr.net/gh/LuisFerOD/Fonts/fonts/pricedown.ttf') format('truetype');
        }
      `}</style>

      <ThemesSection />
    </div>
  );
}