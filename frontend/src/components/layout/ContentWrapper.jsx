import { useEffect, useRef, useState } from "react";
import StatRadar from "../pokemon/stats";
import TypeChip from "../ui/types";
import Evolution from "../Evolutions";
import { genThemes } from "../../theme/genThemes";

function ContentWrapper({ mode, searchQuery, onBack, onSearchComplete, onSearch, onSearchError }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [typedText, setTypedText] = useState("");
  const audioRef = useRef(null);
  const [isShiny, setIsShiny] = useState(false);
  const theme = genThemes[pokemonData?.generation] || genThemes[1];

  // FETCH
  useEffect(() => {
    if (!searchQuery) return;

    setPokemonData(null);

    fetch(`http://localhost:8000/pokemon/${searchQuery.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        setPokemonData(data);
        setActiveForm(0);
          onSearchComplete?.();
        if (data.error) throw new Error("not found");
      })
      .catch(() => {
        onSearchError?.(searchQuery);
      });
   }, [searchQuery]);

  // TYPEWRITER 
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

      setTypedText(text.slice(0, index));
    }, 20);

    return () => clearInterval(interval);
  }, [pokemonData]);


  const [activeForm, setActiveForm] = useState(0);
  const currForm = pokemonData?.forms?.[activeForm] || null;
  const bst = currForm?.stats
    ? Object.values(currForm.stats).reduce((sum, stat) => sum + stat, 0)
    : 0;

  const playCry = () => {
    if (!currForm?.cry) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(currForm.cry);
    audioRef.current.volume = 0.4;

    audioRef.current.play().catch(err => {
      console.error("Audio failed:", err);
    });
  };

  
  return (
    //<div className='relative ${mode === "pokemon" ? "min-h-[780px]" : "h-[520px]"} overflow-visible rounded-3xl bg-gradient-to-br from-[#141822] to-[#0f1117] border border-[#2a2f3a] shadow-[0_0_80px_rgba(255,106,0,0.08)]'>
      <div className={`relative ${
        mode === "pokemon"
        ? "min-h-[780px]"
        : "h-[520px]"
        } overflow-visible rounded-3xl bg-gradient-to-br ${theme.gradient} 
        border border-[#2a2f3a] shadow-[0_0_80px_rgba(255,106,0,0.08)]`}>

        {mode !== "pokemon" ? (
        <div className="min-h-[520px] flex items-center justify-center">

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

          {mode === "error" && (
    <div className="flex flex-col items-center gap-6">
        <img
            src="/MissingNo.gif"
            alt="MissingNo"
            className="w-80 h-80 object-contain pixelated"
            //style={{ imageRendering: "pixelated" }}
        />
        <div className="flex flex-col items-center gap-2">
            <p className="text-red-400 text-lg font-semibold tracking-wide">
                Uh oh! Looks like <span className="text-white">"{searchQuery}"</span> summoned MissingNo.
            </p>
            <p className="text-gray-500 text-sm">
                Double-check the name and try again
            </p>
        </div>
    </div>
)}

        </div>
        ) : (
        <>
        

        {/* RIGHT PANEL */}
        
          <div className="h-full grid grid-cols-1 lg:grid-cols-2
                          gap-12 px-6 lg:px-14 py-12 items-start">

            {/* LEFT SIDE */}
            <div className="flex flex-col justify-between">

              <div className="flex flex-col gap-4">
                <p className="text-white text-3xl font-semibold tracking-wide">
                  {pokemonData?.name || searchQuery}
                </p>

                {/* Forms */}
                <div className="flex gap-1 bg-white/[0.04] p-1 rounded-xl w-fit flex-wrap">
                  {pokemonData?.forms?.map((form, index) => (
                  <button
                    key={form.name}
                    onClick={() => setActiveForm(index)}
                    className={`px-3 py-1 rounded-lg text-xs transition ${
                    activeForm === index
                      ? "bg-white/[0.08] text-white"
                      : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {form.name.replaceAll("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
                  </button>
                  ))}
                </div>

                <button onClick={()=> setIsShiny(!isShiny)}
                   className={`mt-2 px-4 py-1 rounded-lg w-fit border transition ${
                     isShiny
                      ? "border-yellow-400 text-yellow-300 bg-yellow-400/10"
                      : "border-white/10 text-gray-300 hover:border-yellow-400/40"
                    }`}
                >
                  &#10024; {isShiny ? "Shiny Active" : "Activate Shiny"}
                </button>

                {/* TYPES */}
                <div className="flex gap-2">
                  {currForm?.types?.map((type) => (
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
                  {pokemonData && currForm && (
                    <img
                      src={ isShiny && currForm.shiny_sprite
                        ?  currForm.shiny_sprite
                        : currForm.sprite}

                      alt={currForm.name}
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

                <button onClick={playCry} 
                className="text-xs text-gray-400 hover:text-white transition-colors">
                  🔊 Play Cry
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-center justify-start gap-3 pt-3">


              <div className="mb-6 lg:-mt-10">
                {pokemonData && mode == "pokemon" && (
                  <div className="w-[240px] h-[280px] lg:w-[320px] lg:h-[320px]">
                    <StatRadar
                      stats={currForm.stats}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-xs text-gray-400 mt-6 lg:mt-1">
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
                  {currForm?.type_effectiveness?.x2?.map(type => (
                    <TypeChip key={type} type={type} />
                  ))}
                  {currForm?.type_effectiveness?.x4?.length > 0 && (
                  <> <p className="text-red-400 text-xs">x4</p>
                  <div className="flex gap-2">
                      {currForm?.type_effectiveness?.x4?.map(type => (
                      <TypeChip key={type} type={type} />
                       ))}
                  </div>
                </>
                )}
                </div>  

                <p className="text-gray-400 text-xs tracking-wider">RESISTS</p>
                <div className="flex flex-wrap justify-center gap-2">
                 {currForm?.type_effectiveness?.x0_5?.map(type => (
                  <TypeChip key={type} type={type} />
                 ))}
                 {currForm?.type_effectiveness?.x0_25?.length > 0 && (
                   <>
                  <p className="text-blue-400 text-xs">x0.25</p>
                  <div className="flex gap-2">
                      {currForm.type_effectiveness?.x0_25?.map(type => (
                        <TypeChip key={type} type={type} />
                      ))}
                  </div>
                  </>
                  )}
                </div>  
                
                <p className="text-gray-400 text-xs tracking-wider">IMMUNE TO</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {currForm?.type_effectiveness?.x0?.map(type => (
                  <TypeChip key={type} type={type} />
                  ))}
                </div>
                                    
                
              </div>

            </div>
          </div>

          <div className="px-14 pb-10">
             <h2 className="text-3xl font-bold text-white mb-10 tracking-wide text-center">
              Evolution Chain
              </h2>
            {pokemonData?.evolutions.children?.length > 0 ? (
              <Evolution evolutions={pokemonData.evolutions} isShiny={isShiny}
              onSearch={onSearch} />) :  
               (
                <p className="text-gray-500 text-sm text-center mt-6 tracking-wide">
                {pokemonData?.name} does not evolve.
                </p>
              )}

          </div>

          {/* BACK BUTTON */}
          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
      </>
          )}
    </div>

  );
}

export default ContentWrapper;