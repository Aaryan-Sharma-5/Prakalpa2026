import img1 from './assets/gallery_images/img1.png';
import img2 from './assets/gallery_images/img2.png';
import img3 from './assets/gallery_images/img3.png';
import img4 from './assets/gallery_images/img4.png';
import img5 from './assets/gallery_images/img5.png';
import img6 from './assets/gallery_images/img6.png';
import img7 from './assets/gallery_images/img7.png';
import img8 from './assets/gallery_images/img8.png';
import img9 from './assets/gallery_images/img9.png';
import img10 from './assets/gallery_images/img10.png';

const galleryStyles = `
  .gallery-parent {
    padding: 1rem;
    background: transparent;
    /* Default (Desktop/Laptop) */
    height: 80vh;
    min-height: 750px;
    width: 100%;
    max-width: 2000px;
    margin: auto;
    border: none;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.8rem;
  }

  /* Large Screens (Ultrawide/Large Desktop) */
  @media (min-width: 1800px) {
    .gallery-parent {
      max-width: 2400px;
      height: 100vh;
    }
  }

  /* Mobile/Tablet (Portrait/Small Screens) */
  @media (max-width: 1024px) {
    .gallery-parent {
      height: auto;
      min-height: auto;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 300px); /* 3 rows for 6 images */
      gap: 0.5rem;
    }
    
    /* On mobile, we disable the complex clip-path/height transition logic visually */
    .gallery-child {
      height: 100% !important;
      clip-path: none !important;
      align-self: stretch !important;
    }

    /* Hide 7th-10th images on small screens */
    .gallery-child:nth-child(n+7) {
      display: none !important;
    }
  }

  .gallery-child {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    border: 1px solid #2e282d;
    background: #181818;
    box-shadow: 0 4px 18px 0 rgba(0,0,0,0.25);
    transition: height 0.2s;
  }
  .gallery-child img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.25s;
    cursor: pointer;
  }
  .gallery-child img:hover {
    transform: scale(1.12);
    z-index: 2;
  }

  .gallery-logo-wrapper {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    top: -20%;
    left: 0;
    z-index: 60;
  }

  .gallery-logo-stack {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: center;
    gap: 0.8rem;
    text-align: center;
    margin-left: 0;
    width: 100%;
    max-width: 900px;
  }

  /* Desktop Default: Memories on one line, "of" and "Prakalpa25" on next */
  .gallery-logo-memories {
    font-family: pricedown;
    font-style: italic;
    font-weight: 900;
    color: #ffffff;
    text-shadow: 0 4px 0 #000;
    letter-spacing: 0.08em;
    white-space: nowrap;
    line-height: 1;
    margin: 0;
    padding: 0;
    text-transform: none;
    font-size: 5rem;
    margin-bottom: 0.1rem;
    width: 100%; /* Force new line */
    text-align: center;
  }

  .gallery-logo-of {
    font-family: pricedown;
    font-style: italic;
    font-weight: 900;
    color: #ffffff;
    text-shadow: 0 4px 0 #000;
    letter-spacing: 0.08em;
    white-space: nowrap;
    line-height: 1;
    margin: 0;
    padding: 0;
    text-transform: none;
    font-size: 3rem;
    margin-bottom: 0.1rem;
    width: auto;
  }

  /* Mobile Adjustments */
  @media (max-width: 1024px) {
    .gallery-logo-wrapper {
      top: -15%;
      left: 0;
      justify-content: center;
    }
    .gallery-logo-stack {
      margin-left: 0 !important;
      justify-content: center !important;
      align-items: baseline !important; /* Keep baseline alignment */
      gap: 0.5rem !important;
    }
    .gallery-logo-memories {
      font-size: 3rem !important;
      width: auto !important; /* Allow 'of' to sit next to it */
    }
    .gallery-logo-of {
      font-size: 2rem !important;
      width: auto !important;
    }
    /* Force new line for Prakalpa25 on mobile */
    .gallery-logo-script {
      font-size: 4rem !important;
      width: 100% !important; 
      text-align: center;
      margin-top: 0rem;
    }
  }

  .gallery-logo-script {
    font-family: 'Pacifico', 'Brush Script MT', cursive;
    font-size: 6rem;
    color: #ff7dd9;
    text-shadow:
      0 0 4px #ff7dd9,
      0 0 10px #ff7dd9,
      0 0 18px #ff7dd9,
      0 0 26px #000;
    letter-spacing: 0.05em;
    white-space: nowrap;
    line-height: 1;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 768px) {
    .gallery-logo-script {
      font-size: 6rem;
    }
    .gallery-logo-memories {
      font-size: 5.5rem;
    }
    .gallery-logo-of {
      font-size: 4.2rem;
    }
  }
  @media (min-width: 1024px) {
    .gallery-logo-script {
      font-size: 8rem;
    }
    .gallery-logo-memories {
      font-size: 7rem;
    }
    .gallery-logo-of {
      font-size: 5.2rem;
    }
  }
`;

const galleryImages = [
  // Only 10 images for 5x2 grid
  img8,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img1,
  img9,
  img10
];

// Default heights for top and bottom cells (percent of grid row)
const defaultTopCellHeights = [112, 86, 98, 100, 81];    // cells 0-4
const defaultBottomCellHeights = [107, 131, 123, 118, 131]; // cells 5-9

// Default polygons for each cell (edit as needed)
const defaultPolygons = [
  [[0, 0], [100, 0], [100, 94], [0, 85]],//1
  [[0, 0], [100, 0], [100, 83], [0, 96]],//2
  [[0, 0], [100, 0], [100, 84], [0, 96]],//3
  [[0, 0], [100, 0], [100, 83], [0, 97]],//4
  [[0, 0], [100, 0], [100, 97], [0, 87]],//5
  [[0, 3], [100, 12], [100, 100], [0, 100]],//6
  [[0, 12], [100, 3], [100, 100], [0, 100]],//7
  [[0, 16], [100, 6], [100, 100], [0, 100]],//8
  [[0, 15], [100, 2], [100, 100], [0, 100]],//9
  [[0, 2], [100, 8], [100, 100], [0, 100]],//10
];

const getClipPath = (points: number[][]) =>
  `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;

// Top row: bottom edge moves. Bottom row: top edge moves, bottom stays fixed (alignSelf: 'end')
const getCellStyle = (i: number) => {
  if (i < 5) {
    return {
      clipPath: getClipPath(defaultPolygons[i]),
      height: `${defaultTopCellHeights[i]}%`,
      minHeight: 0,
      transition: 'height 0.2s',
    };
  } else {
    return {
      clipPath: getClipPath(defaultPolygons[i]),
      height: `${defaultBottomCellHeights[i - 5]}%`,
      minHeight: 0,
      alignSelf: 'end',
      transition: 'height 0.2s',
    };
  }
};

export default function Gallery() {
  return (
    <>
      {/* Add Google Fonts link for Texturina */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Texturina:ital,opsz,wght@0,12..72,100..900;1,12..72,100..900&display=swap" rel="stylesheet" />
      <style>{galleryStyles}</style>
      <section
        id="gallery"
        className="relative w-full bg-gradient-to-b from-black to-zinc-950 text-white py-2 px-0 flex items-center justify-center overflow-hidden"
      >
        {/* Abstract Background Glows (Same as FAQ/Footer) */}
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/20 blur-[120px] pointer-events-none" />

        <div className="gallery-parent relative z-10">
          {galleryImages.map((img, i) => (
            <div key={i} className="gallery-child" style={getCellStyle(i)}>
              <img src={img} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* Stacked Memories / of Prakalpa25 */}
        <div className="gallery-logo-wrapper">
          <div className="gallery-logo-stack">
            <div className="gallery-logo-memories">Memories</div>
            <div className="gallery-logo-of">of</div>
            <div className="gallery-logo-script">Prakalpa25</div>
          </div>
        </div>
      </section>
    </>
  );
}