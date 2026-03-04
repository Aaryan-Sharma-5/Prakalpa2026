import React, { useEffect, useState } from "react"

/**
 * GTA-style stats component (HUD)
 * Reverse countdown to 9th April
 */
const GTAStats: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [starCount, setStarCount] = useState(5)
  const [money, setMoney] = useState(0)

  // ================= TIME LOGIC =================
  function getTimeLeft() {
    const targetDate = new Date(
      new Date().getFullYear(),
      3, // April (0-based)
      9,
      0,
      0,
      0
    )

    const now = new Date().getTime()
    const diff = targetDate.getTime() - now

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ================= WANTED LEVEL =================
  useEffect(() => {
    const handleScroll = () => {
      setStarCount(5) // Always display five stars
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ================= MONEY COUNTER =================
  useEffect(() => {
    let counter = 0
    const interval = setInterval(() => {
      if (counter < 50000) {
        counter += 1000
        setMoney(counter)
      } else {
        clearInterval(interval)
      }
    }, 10)

    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div className="absolute top-4 right-2 z-[9999] pointer-events-none flex flex-col gap-2 scale-[1.1] origin-top-right">


      {/* TIME DISPLAY */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-black rounded-lg flex items-center justify-center">
          <div
            className="text-sm sm:text-lg md:text-xl text-center"
            style={{
              fontFamily: "pricedown",
              color: "#fff",
              textShadow:
                "2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
            }}
          >
           {timeLeft.days} DAYS LEFT
          </div>
        </div>

        <div
          className="text-lg sm:text-xl md:text-2xl tracking-wider"
          style={{
            fontFamily: "pricedown",
            color: "#fff",
            textShadow:
              "2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          }}
        >
         
          {pad(timeLeft.hours)}:
          {pad(timeLeft.minutes)}:
          {pad(timeLeft.seconds)}
        </div>
      </div>

      {/* WANTED STARS */}
      <div className="flex justify-center gap-0.5 mb-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5">
            <div
              className={`absolute inset-0 ${
                i < starCount ? "opacity-100" : "opacity-30"
              }`}
              style={{
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                backgroundColor: i < starCount ? "#fbbf24" : "#666",
                border: "1px solid #000",
              }}
            />
          </div>
        ))}
      </div>

      {/* HEALTH + MONEY (CENTERED) */}
      <div className="flex flex-col items-center gap-1 mt-1">
        {/* HEALTH BAR */}
        <div className="w-32 sm:w-36 md:w-40 h-3 sm:h-4 bg-black border border-black">
          <div
            className="h-full"
            style={{
              width: "75%",
              background:
                "linear-gradient(180deg, #ff6b6b 0%, #cc0000 100%)",
            }}
          />
        </div>

        {/* MONEY */}
        <div
          className="text-lg sm:text-xl md:text-2xl"
          style={{
            fontFamily: "pricedown",
            color: "#4ade80",
            textShadow:
              "2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          }}
        >
          ₹{money.toLocaleString("en-IN")}
        </div>
        <div
  className="text-sm sm:text-base md:text-lg px-4 py-2"
  style={{
    fontFamily: "pricedown",
    color: "#4ade80",
    textShadow:
      "2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
  }}
>
  ENTRY FEES ₹600
</div>

      </div>
    </div>
  )
}

export default GTAStats
