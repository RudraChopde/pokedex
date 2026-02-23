function ContentWrapper({ mode, searchQuery, onBack }) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#141822] to-[#0f1117] border border-[#2a2f3a] shadow-[0_0_80px_rgba(255,106,0,0.08)]">
      
      {/* SLIDING CONTAINER */}
      <div
        className="flex h-full transition-transform duration-[1800ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
        style={{
          transform: mode === "pokemon" ? "translateX(-100%)" : "translateX(0%)",
        }}
      >
  
        {/* LEFT PANEL (Home + Loading) */}
        <div className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
    
          {mode === "home" && (
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-white text-3xl font-semibold tracking-wide">
                <span className="text-orange-500">ROTOM</span> DEX
              </h1>
              <p className="text-white text-xl tracking-widest">
                READY
              </p>
            </div>
          )}

          {mode === "loading" && (
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="w-12 h-12 border-2 border-white/30 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-white text-lg tracking-wide">
                Analyzing Data...
              </p>
            </div>
          )}
        </div>

        {/* RIGHT PANEL (Pokemon - fades in) */}
        <div className={`relative w-full h-full flex-shrink-0 transition-opacity duration-1000 ${
            mode === "pokemon" ? "opacity-100" : "opacity-0"
            }`}>
            <div className="h-full grid grid-cols-2 gap-12 px-14 py-12">

                {/* LEFT SIDE - Identity + Narrative */}
                <div className="flex flex-col justify-between">

                    {/* Top Identity */}
                    <div className="flex flex-col gap-4">
                        <p className="text-white text-3xl font-semibold tracking-wide">
                            {searchQuery}
                        </p>

                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full text-xs tracking-wide bg-white/[0.05]">
                                Water
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs tracking-wide bg-white/[0.05]">
                                Dark
                            </span>
                        </div>
                    </div>

                    {/* Middle Image */}
                    <div className="flex justify-center">
                        <div className="w-44 h-44 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-gray-500">
                            Image
                        </div>
                    </div>

                  {/* Bottom Dex Entry */}
                  <div className="flex flex-col gap-4">
                    <div className="w-[80%] h-px bg-white/[0.08] mx-auto"></div>

                        <p className="text-gray-300 text-sm leading-relaxed">
                            This Pokémon can compress water into sharp shuriken.
                        </p>

                        <button className="text-xs text-gray-400 hover:text-white transition-colors">
                            🔊 Playing
                        </button>
                    </div>

                </div>

                {/* RIGHT SIDE - Battle Panel */}
                <div className="flex flex-col items-center justify-start gap-10 pt-6">

                {/* Radar Placeholder */}
                <div className="w-56 h-56 rounded-full border border-white/[0.08] flex items-center justify-center text-gray-500">
                    Radar
                </div>

                {/* Type Effectiveness Placeholder */}
                <div className="flex flex-col gap-2 text-sm text-gray-400 text-center">
                    <div>Weak ×2</div>
                    <div>Resist ×0.5</div>
                    <div>Immune</div>
                </div>

            </div>

        </div>

          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-sm text-gray-400 hover:text-white transition-colors">
            ← Back
            </button>
        </div>
        
      </div>
    </div>
  );
}

export default ContentWrapper;  