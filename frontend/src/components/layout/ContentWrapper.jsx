import { useEffect, useState } from "react";
import StatRadar from "../pokemon/stats";
import TypeChip from "../ui/types";

function ContentWrapper({ mode, searchQuery, onBack }) {
  const [form, setForm] = useState("Base");
  const [isMega, setIsMega] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [typedText, setTypedText] = useState("");

  // 🔥 FETCH
  useEffect(() => {
    if (!searchQuery || mode !== "pokemon") return;

    setPokemonData(null);

    fetch(`http://localhost:8000/pokemon/${searchQuery.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        setPokemonData(data);
      })
      .catch((err) => console.error(err));
  }, [searchQuery, mode]);

  // 🔥 TYPEWRITER (FINAL FIX — NO undefined EVER)
  useEffect(() => {
    if (!pokemonData?.description) return;

    let index = 0;

    const text = pokemonData.description
      .replace(/[\f\n\r]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const interval = setInterval(() => {
      index++;

      if (index > text.length) {
        clearInterval(interval);
        return;
      }

      // ✅ SAFE — no out-of-bounds ever
      setTypedText(text.slice(0, index));
    }, 20);

    return () => clearInterval(interval);
  }, [pokemonData]);

  const forms = ["Base", "Ash"];
  const hasMega = true;

  const bst = pokemonData?.stats
    ? Object.values(pokemonData.stats).reduce((sum, stat) => sum + stat, 0)
    : 0;

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#141822] to-[#0f1117] border border-[#2a2f3a] shadow-[0_0_80px_rgba(255,106,0,0.08)]">
      
      <div
        className="flex h-full transition-transform duration-[1800ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
        style={{
          transform: mode === "pokemon" ? "translateX(-100%)" : "translateX(0%)",
        }}
      >

        {/* LEFT PANEL */}
        <div className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
          {mode === "home" && (
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-white text-3xl font-semibold tracking-wide">
                <span className="text-orange-500">ROTOM</span> DEX
              </h1>
              <p className="text-white text-xl tracking-widest">READY</p>
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

        {/* RIGHT PANEL */}
        <div className={`relative w-full h-full flex-shrink-0 transition-opacity duration-1000 ${
          mode === "pokemon" ? "opacity-100" : "opacity-0"
        }`}>

          <div className="h-full grid grid-cols-2 gap-12 px-14 py-12 items-start">

            {/* LEFT SIDE */}
            <div className="flex flex-col justify-between">

              <div className="flex flex-col gap-4">
                <p className="text-white text-3xl font-semibold tracking-wide">
                  {pokemonData?.name || searchQuery}
                </p>

                {/* Forms */}
                <div className="flex gap-1 bg-white/[0.04] p-1 rounded-xl w-fit">
                  {forms.map((f) => (
                    <button
                      key={f}
                      onClick={() => setForm(f)}
                      className={`px-3 py-1 rounded-lg text-xs transition ${
                        form === f
                          ? "bg-white/[0.08] text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {hasMega && (
                  <button
                    onClick={() => setIsMega(!isMega)}
                    className="mt-2 px-4 py-1 rounded-lg w-fit border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 transition"
                  >
                    {isMega ? "🧬 Revert Mega" : "🧬 Activate Mega"}
                  </button>
                )}

                {/* TYPES */}
                <div className="flex gap-2">
                  {pokemonData?.types?.map((type) => (
                    <TypeChip key={type} type={type} />
                  ))}
                </div>
              </div>

              {!pokemonData && (
                <p className="text-gray-500 text-sm">Loading Pokémon...</p>
              )}

              {/* IMAGE */}
              <div className="flex flex-col items-center mt-6">
                <div className="w-44 h-44 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center overflow-hidden">
                  {pokemonData && (
                    <img
                      src={pokemonData.sprite}
                      alt={pokemonData.name}
                      className="w-40 h-40 object-contain"
                    />
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="flex flex-col gap-4">
                <div className="w-full h-px bg-white/[0.08]"></div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {typedText || "Scanning for Pokédex entry..."}
                  <span className="animate-pulse text-white ml-1">|</span>
                </p>

                <button className="text-xs text-gray-400 hover:text-white transition-colors">
                  🔊 Playing
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-center justify-start gap-3 pt-3">

              <div className="-mt-10 mb-2">
                {pokemonData && (
                  <StatRadar
                    key={pokemonData.name}
                    stats={pokemonData.stats}
                  />
                )}

                <div className="flex flex-col items-center text-xs text-gray-400 mt-1">
                  <span className="tracking-[0.2em] text-[11px] text-gray-500">
                    BASE STAT TOTAL
                  </span>
                  <span className="text-orange-400 text-lg font-semibold">
                    {bst}
                  </span>
                </div>
              </div>

              {/* TYPE EFFECTIVENESS */}
              <div className="flex flex-col items-center gap-2 text-sm">
                <p className="text-gray-400 text-xs tracking-wider">WEAK TO</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {pokemonData?.type_effectiveness.x2.map(type => (
                    <TypeChip key={type} type={type} />
                  ))}
                  {pokemonData?.type_effectiveness.x4.length > 0 && (
  <>              <p className="text-red-400 text-xs">x4</p>
                  <div className="flex gap-2">
                      {pokemonData.type_effectiveness.x4.map(type => (
                      <TypeChip key={type} type={type} />
                       ))}
                  </div>
                </>
                )}
                </div>  

                <p className="text-gray-400 text-xs tracking-wider">RESISTS</p>
                <div className="flex flex-wrap justify-center gap-2">
                 {pokemonData?.type_effectiveness.x0_5.map(type => (
                  <TypeChip key={type} type={type} />
                 ))}
                 {pokemonData?.type_effectiveness.x0_25.length > 0 && (
                   <>
                  <p className="text-blue-400 text-xs">x0.25</p>
                  <div className="flex gap-2">
                      {pokemonData.type_effectiveness.x0_25.map(type => (
                        <TypeChip key={type} type={type} />
                      ))}
                  </div>
                  </>
                  )}
                </div>  
                
                <p className="text-gray-400 text-xs tracking-wider">IMMUNE TO</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {pokemonData?.type_effectiveness.x0.map(type => (
                  <TypeChip key={type} type={type} />
                  ))}
                </div>
                                    
                
              </div>

            </div>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>

        </div>
      </div>
    </div>
  );
}

export default ContentWrapper;