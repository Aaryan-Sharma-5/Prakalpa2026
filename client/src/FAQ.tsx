import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Prakalpa’26?",
      answer:
        "Prakalpa’26 is the 17th edition of ISTE KJSSE’s flagship event, focused on innovation through paper and working model presentations."
    },
    {
      question: "Who is organizing Prakalpa’26?",
      answer:
        "Prakalpa’26 is organized by ISTE KJSSE to encourage research, creativity, and technical excellence."
    },
    {
      question: "Who can participate in Prakalpa’26?",
      answer:
        "Students from engineering and related disciplines across colleges can participate in Prakalpa’26."
    },
    {
      question: "Is Prakalpa’26 a national-level competition?",
      answer:
        "Yes, Prakalpa’26 is a national-level competition with participation from institutions across India."
    },
    {
      question: "What domains are included in Prakalpa’26?",
      answer:
        "Prakalpa’26 includes multiple technical and interdisciplinary domains. Details will be announced soon."
    },
    {
      question: "How can participants register for Prakalpa’26?",
      answer:
        "Registration details will be shared through official ISTE KJSSE communication channels."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-black to-zinc-950 text-white pt-12 pb-24 px-6 overflow-hidden">
      {/* Abstract Background Glows (Same as Footer) */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <h2 className="text-white text-5xl md:text-7xl font-black tracking-wider transform -skew-x-12"
            style={{
              fontFamily: 'pricedown, sans-serif',
              textShadow: `
                4px 4px 0px #ec4899,
                -1px -1px 0px rgba(0,0,0,0.5),
                5px 5px 15px rgba(0,0,0,0.8)
              `
            }}>
            FAQ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            {faqs.slice(0, 3).map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => toggleFAQ(i)}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {faqs.slice(3).map((faq, i) => (
              <FAQItem
                key={i + 3}
                faq={faq}
                isOpen={openIndex === i + 3}
                onClick={() => toggleFAQ(i + 3)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onClick }: { faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }) {
  return (
    <div
      className={`group border-2 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden relative ${isOpen
        ? "bg-pink-900/20 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
        : "bg-black/40 border-zinc-800 hover:border-pink-300/50 hover:bg-black/60"
        }`}
      onClick={onClick}
    >
      <div className="p-6 flex justify-between items-center gap-4">
        <h3 className={`font-semibold text-lg tracking-wide transition-colors ${isOpen ? "text-pink-300" : "text-zinc-300 group-hover:text-pink-300"}`}>
          {faq.question}
        </h3>
        <div className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          {isOpen ? <Minus className="w-5 h-5 text-pink-300" /> : <Plus className="w-5 h-5 text-zinc-500 group-hover:text-pink-300" />}
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6 px-6" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <p className="text-zinc-400 leading-relaxed font-medium">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}
