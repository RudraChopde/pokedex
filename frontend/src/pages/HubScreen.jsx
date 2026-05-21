import { genThemes } from "../theme/genThemes";
import { hubCards } from "../config/hubCards";
import { typeColors } from "../components/ui/types";

const hubTypeStyles = {
  normal:   { border: "border-zinc-400/60",   glow: "rgba(161,161,170,0.5)"  },
  fighting: { border: "border-orange-500/60", glow: "rgba(249,115,22,0.5)"   },
  psychic:  { border: "border-pink-500/60",   glow: "rgba(236,72,153,0.5)"   },
  steel:    { border: "border-gray-400/60",   glow: "rgba(156,163,175,0.5)"  },
   // add new types here when needed
};

const badgeColors = {
  normal:   "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
  fighting: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  psychic:  "bg-pink-500/20 text-pink-300 border-pink-500/40",
  steel:    "bg-gray-400/20 text-gray-300 border-gray-400/40",
};

export default function HubScreen({ onNavigate }) {
  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center px-6 animate-fadeIn">

      {/* SCANLINES */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)"
        }}
      />

      {/* HEADER */}
      <div className="flex flex-col items-center gap-2 mb-14 z-20">
        <h1 className="text-white text-4xl font-bold tracking-wide">
          <span className="text-orange-500">SUPER</span> DEX
        </h1>
        <p className="text-gray-500 text-sm tracking-widest">
          WHAT WOULD YOU LIKE TO EXPLORE?
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl z-20">
        {hubCards.map((card) => {
            const styles = hubTypeStyles[card.type];
            
          return (
            <button
              key={card.title}
              onClick={() => card.available && onNavigate(card.page)}
              disabled={!card.available}
              className={`
                    relative flex flex-col items-start gap-3 p-6
                    rounded-2xl border ${styles.border}
                    bg-white/[0.03]
                    transition-all duration-300
                    ${card.available
                         ? "cursor-pointer hover:scale-105 hover:brightness-125"
                            : "cursor-not-allowed opacity-30"
                }
                `}
                style={{
                    boxShadow: card.available
                    ? `0 0 60px ${styles.glow}, 0 0 20px ${styles.glow}`
                    : "none"
                }}>
                
              {/* TYPE BADGE */}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border ${badgeColors[card.type]}`}>
                {card.type}
            </span>
              {/* TITLE */}
              <p className="text-white text-xl font-bold tracking-wide">
                {card.title}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* COMING SOON BADGE */}
              {!card.available && (
                <span className="absolute top-4 right-4 text-xs text-gray-500 border border-gray-700 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}