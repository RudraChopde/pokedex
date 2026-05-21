import { X } from "lucide-react";
import { hubCards } from "../../config/hubCards";

const badgeColors = {
  normal:   "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
  fighting: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  psychic:  "bg-pink-500/20 text-pink-300 border-pink-500/40",
  steel:    "bg-gray-400/20 text-gray-300 border-gray-400/40",
};

export default function Sidebar({ isOpen, onClose, onNavigate, currentPage }) {
  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR PANEL */}
      <div className={`fixed top-0 left-0 h-full w-72 z-50 bg-[#0f1117] border-r border-white/10
        flex flex-col gap-2 px-4 py-6
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg tracking-wide">
            <span className="text-orange-500">SUPER</span> DEX
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* BACK TO HUB */}
        <button
          onClick={() => { onNavigate("hub"); onClose(); }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
        >
          ← Back to Hub
        </button>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/10 my-2" />

        {/* NAV ITEMS */}
        {hubCards.map((card) => {
          const isActive = currentPage === card.page;

          return (
            <button
              key={card.title}
              onClick={() => {
                if (card.available) {
                  onNavigate(card.page);
                  onClose();
                }
              }}
              disabled={!card.available}
              className={`
                flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-all
                ${isActive
                  ? "bg-white/10 text-white"
                  : card.available
                    ? "text-gray-400 hover:text-white hover:bg-white/5"
                    : "text-gray-600 cursor-not-allowed"
                }
              `}
            >
              <div className="flex items-center gap-3">
                 {card.title}
              </div>

              {!card.available && (
                <span className="text-[10px] text-gray-600 border border-gray-700 px-2 py-0.5 rounded-full">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}