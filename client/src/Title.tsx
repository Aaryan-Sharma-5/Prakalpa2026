import React, { useEffect } from 'react';

const Title: React.FC = () => {
  useEffect(() => {
    console.log('Title mounted');
  }, []);

  return (
    <div
      id="title-portal"
      className="
        absolute
        left-1/2
        top-[46.5%] sm:top-[48.5%]
        -translate-x-1/2
        -translate-y-1/2
        z-[1000]
        pointer-events-none
        flex
        flex-col
        items-center
      "
    >
      {/* ISTE KJSSE presents */}
      <h2
        className="
          text-center
          text-2xl sm:text-2xl md:text-3xl
          font-pricedown
          mb-4
        "
      >
        ISTE KJSSE presents
      </h2>

      <div className="relative flex items-center justify-center mt-8">
        {/* XXVI background text */}
        <div
          id="xxvi-bg"
          className="
            absolute
            text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[28rem]
            font-pricedown
            uppercase
            tracking-wide
            whitespace-nowrap
            select-none
            leading-none
            font-extrabold
            pointer-events-none
            z-[1000]
          "
        >
          <span className="xxvi-hoverable pointer-events-auto">
            26
          </span>
        </div>

        {/* Prakalpa foreground title */}
        <h1
          className="
            m-0
            text-6xl sm:text-7xl md:text-[8.5rem] lg:text-[10rem]
            font-pricedown
            uppercase
            z-[1001]
            drop-shadow-[0_4px_0_black]
            whitespace-nowrap
            pointer-events-auto
          "
        >
          <span className="prakalpa-hover">
            Prakalpa
          </span>
        </h1>
      </div>


      {/* Subheading */}
      <h2
        className="
          text-xl sm:text-xl md:text-2xl
          font-pricedown
          whitespace-nowrap
          z-[1002]
          mt-2
          self-end
          relative right-[-1rem] sm:right-0
        "
      >
        National
        <br />
        Level
        <br />
        Competition
      </h2>
    </div>
  );
};

export default Title;
