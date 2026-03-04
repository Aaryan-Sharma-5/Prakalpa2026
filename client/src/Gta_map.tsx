import React, { useEffect, useRef, useState } from "react"
// Replace with your actual map image path
import mapBg from "./assets/Map_Image.png"

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=K+J+Somaiya+College+of+Engineering+19.072847,72.899926"

const GTAMinimapEmbed: React.FC = () => {
  const minimapRef = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!minimapRef.current) return

      const rect = minimapRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dx = e.clientX - cx
      const dy = e.clientY - cy

      const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      setAngle(deg)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const openMaps = () => {
    window.open(MAPS_URL, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed z-[9999]
                    bottom-4 left-4
                    sm:bottom-6 sm:left-6
                    md:bottom-8 md:left-8">
      <button
        onClick={openMaps}
        aria-label="Open K J Somaiya College of Engineering in Google Maps"
        className="
          relative rounded-full p-[5px] bg-pink-400 cursor-pointer
          transition hover:scale-105 hover:brightness-110

          w-24 h-24   /* ✅ slightly larger on phones */
          sm:w-30 sm:h-30
          md:w-40 md:h-40
          lg:w-40 lg:h-40
        "
      >
        <div
          ref={minimapRef}
          className="relative w-full h-full rounded-full overflow-hidden bg-black cursor-pointer"
        >
          {/* Replaced iframe with static image */}
          <img
            src={mapBg}
            alt="Event Location Map"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, #1a237e 0%, #ff2fd6 70%, #ffe066 100%)",
              mixBlendMode: "multiply",
              opacity: 0.45,
            }}
          />

          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          <div
            className="absolute top-1/2 left-1/2 z-20 pointer-events-none"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transition: "transform 0.08s linear",
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="
                w-4 h-4
                sm:w-5 sm:h-5
                md:w-6 md:h-6
              "
            >
              <circle cx="50" cy="55" r="28" fill="white" />
              <polygon points="50,5 65,35 35,35" fill="white" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  )
}

export default GTAMinimapEmbed
