import { useEffect, useState } from "react"
import gtaBg1 from "./assets/Gta6_bg.jpeg"
import gtaBg2 from "./assets/Load_1.webp"
import gtaBg3 from "./assets/Load_2.webp"

const images = [gtaBg1, gtaBg3, gtaBg2]

export default function LoadingScreen({
  exiting = false,
  audioRef,
  muted,
  setMuted,
}: {
  exiting?: boolean
  audioRef: React.RefObject<HTMLAudioElement | null>
  muted: boolean
  setMuted: (v: boolean) => void
}) {
  const [index, setIndex] = useState(0)
  const [dim, setDim] = useState(false)

  /* ✅ Prevent page scrollbar while loader is visible */
  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDim(true)
      setTimeout(() => setIndex((i) => (i + 1) % images.length), 400)
      setTimeout(() => setDim(false), 800)
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  const startMusic = () => {
    if (!audioRef.current) return

    if (muted) {
      audioRef.current.muted = false
      audioRef.current.play().catch(() => {})
      setMuted(false)
    } else {
      audioRef.current.muted = true
      audioRef.current.pause()
      setMuted(true)
    }
  }

  return (
    <div
      onClick={startMusic}
      className={`
        fixed inset-0 z-50 flex flex-col font-pricedown bg-black cursor-pointer
        transition-all duration-800 ease-in-out
        ${exiting ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
      `}
    >
      <div className="flex-1 relative overflow-hidden bg-black">

        <div
          className="
            absolute inset-0
            bg-contain sm:bg-cover
            bg-center
            sm:bg-[center_-80px]
            md:bg-[center_-180px]
            lg:bg-[center_-220px]
            bg-no-repeat
          "
          style={{
            backgroundImage: `url(${images[index]})`,
          }}
        />

        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ${
            dim ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <div className="
          absolute
          top-1/2 left-4
          -translate-y-1/2
          sm:left-10
          text-white
          text-3xl sm:text-5xl md:text-6xl
          leading-tight
        ">
          <span className="block">ISTE</span>
          <span className="block sm:ml-10">KJSSE</span>
          <span className="block">presents</span>
        </div>

        <div className="
          absolute
          top-1/2 right-4
          -translate-y-1/2
          sm:right-10
          text-right text-white
          text-4xl sm:text-6xl md:text-7xl
          leading-none
        ">
          <span className="block">Prakalpa</span>
          <span className="block">26</span>
        </div>
      </div>

      <div className="
        h-28 sm:h-24
        bg-black flex items-center
        px-4 sm:px-10
      ">
        <span className="
          text-white
          text-lg sm:text-3xl md:text-4xl
          tracking-wide
        ">
          TIP: Click anywhere to enable sound.
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            setMuted(!muted)
            if (!audioRef.current) return
            if (muted) {
              audioRef.current.muted = false
              audioRef.current.play().catch(() => {})
            } else {
              audioRef.current.muted = true
              audioRef.current.pause()
            }
          }}
          className="
            ml-auto bg-black/70 text-white
            px-3 py-1 sm:px-4 sm:py-2
            rounded-md
            text-sm sm:text-base
          "
        >
          {muted ? "🔇 Music Off" : "🔊 Music On"}
        </button>
      </div>
    </div>
  )
}
