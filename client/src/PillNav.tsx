import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import somaiyaLogo from "./assets/Logo_somaiya.png";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  showMobileNav?: boolean;
  logoHref?: string;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  showMobileNav = true,
  logoHref,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const handleLogoEnter = () => {
    if (!logoImgRef.current) return;

    gsap.fromTo(
      logoImgRef.current,
      { rotate: 0 },
      { rotate: 360, duration: 0.3, ease }
    );
  };

  const openMenu = () => {
    setIsMobileMenuOpen(true);

    requestAnimationFrame(() => {
      gsap.fromTo(
        drawerRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.35, ease }
      );
    });
  };

  const closeMenu = () => {
    gsap.to(drawerRef.current, {
      x: "-100%",
      duration: 0.3,
      ease,
      onComplete: () => setIsMobileMenuOpen(false)
    });
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) openMenu();
    else closeMenu();
  };

  const isExternalLink = (href: string) =>
    href.startsWith('http') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const LogoComponent = (
    logoHref ? (
      <a
        href={logoHref}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleLogoEnter}
        className="rounded-full p-2 overflow-hidden inline-block"
        style={{ width: '72px', height: '72px' }}
      >
        <img
          src={logo}
          alt={logoAlt}
          ref={logoImgRef}
          className="w-full h-full object-cover"
        />
      </a>
    ) : (
      <Link
        to={items[0].href}
        onMouseEnter={handleLogoEnter}
        className="rounded-full p-2 overflow-hidden inline-block"
        style={{ width: '72px', height: '72px' }}
      >
        <img
          src={logo}
          alt={logoAlt}
          ref={logoImgRef}
          className="w-full h-full object-cover"
        />
      </Link>
    )
  );

  const drawer = (
    <div className="fixed inset-0 z-[999999] md:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeMenu}
      />

      <div
        ref={drawerRef}
        className="absolute left-0 top-0 h-full w-[70%] bg-black shadow-2xl p-6"
      >
        <div className="flex justify-end mb-6">
          <button onClick={closeMenu} className="text-3xl text-white">
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-5 list-none p-0 m-0">
          {items.map(item => (
            <li key={item.href}>
              {isRouterLink(item.href) ? (
                <Link
                  to={item.href}
                  className="text-xl font-semibold font-pricedown text-white"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="text-xl font-semibold font-pricedown text-white"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* PHONE LOGO + BUTTON BELOW */}
      <div className="absolute top-[1em] left-4 md:hidden flex flex-col items-start">
        {LogoComponent}

        {showMobileNav && !isMobileMenuOpen && (
          <button
            onClick={toggleMobileMenu}
            className="mt-2 ml-5 text-3xl text-white"
          >
            ☰
          </button>
        )}
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto hidden md:block">
        <nav
          className={`md:flex w-full md:w-max items-center justify-between md:justify-start box-border px-4 md:px-0 ${className}`}
          aria-label="Primary"
          style={{ background: 'transparent' }}
        >
          <div className="ml-auto">
            <img
              src={somaiyaLogo}
              alt="Somaiya Logo"
              className="h-14 w-auto object-contain"
            />
          </div>

          {LogoComponent}

          <div className="ml-2">
            <ul className="flex items-center gap-4 m-0 p-0 list-none">
              {items.map((item, i) => {
                const isActive = activeHref === item.href;

                const cls = `nav-link px-4 py-2 text-xl font-semibold uppercase tracking-wide hover:text-pink-500 transition-colors duration-200 font-pricedown ${
                  isActive && i !== 0 ? 'text-pink-500' : 'text-black'
                }`;

                return (
                  <li key={item.href}>
                    {isRouterLink(item.href) ? (
                      <Link to={item.href} className={cls}>
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className={cls}>
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && ReactDOM.createPortal(drawer, document.body)}
    </>
  );
};

export default PillNav;


/* GREEN HOVER EFFECT */
const style = document.createElement('style');
style.innerHTML = `
.nav-link {
  position: relative;
  z-index: 1;
}
.nav-link::before {
  content: '';
  position: absolute;
  left: -5%;
  top: 50%;
  transform: translateY(-50%) skew(20deg) scaleX(0.85);
  width: 120%;
  height: 85%;
  background: #02753E;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.2s;
  border-radius: 0.6em;
}
.nav-link:hover::before {
  opacity: 1;
}
`;

if (typeof window !== 'undefined' &&
  !document.getElementById('nav-link-parallelogram-style')) {
  style.id = 'nav-link-parallelogram-style';
  document.head.appendChild(style);
}
