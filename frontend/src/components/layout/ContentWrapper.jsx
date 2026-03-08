import { useState } from "react";
import StatRadar from "../pokemon/stats";
import TypeChip from "../ui/types";

function ContentWrapper({ mode, searchQuery, onBack }) {

  const [form, setForm] = useState("Base");
  const [isMega, setIsMega] = useState(false);

  const forms = ["Base", "Ash"]; // mock for now
  const hasMega = true; // changing this to true later to test

  const mockStats = {
  hp: 72,
  attack: 95,
  defense: 67,
  sp_atk: 103,
  sp_def: 71,
  speed: 122
  };

  const bst = mockStats.hp + mockStats.attack + mockStats.defense + mockStats.sp_atk + mockStats.sp_def + mockStats.speed;
                

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
            <div className="h-full grid grid-cols-2 gap-12 px-14 py-12 items-start">

                {/* LEFT SIDE - Identity + Narrative */}
                <div className="flex flex-col justify-between">

                    {/* Top Identity */}
                    <div className="flex flex-col gap-4">
                        <p className="text-white text-3xl font-semibold tracking-wide">
                            {searchQuery}
                        </p>

                        {/* Forms Toggling */}
                        {forms.length > 1 && (
                          <div className="flex gap-1 bg-white/[0.04] p-1 rounded-xl w-fit">
                            {forms.map((f) => (
                              <button
                                key={f}
                                onClick={() => setForm(f)}
                                className={`px-3 py-1 rounded-lg text-xs transition ${
                                  form === f
                                  ? "bg-white/[0.08] text-white"
                                  : "text-gray-400 hover:text-white"
                                }`}>
                                {f}
                            </button>   
                          ))}
                            </div>
                        )}

                        {hasMega && (
                          <button onClick={() => setIsMega(!isMega)}
                              className="mt-2 px-4 py-1 rounded-lg w-fit border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 transition"
                          >
                            {isMega ? "🧬 Revert Mega" : "🧬 Activate Mega"}
                          </button>
                        )}

                        {/* For TYPES */}
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
                    <div className="flex flex-col items-center mt-6">
                        <div className="w-44 h-44 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-gray-500 overflow-hidden">
                            Image
                        </div>
                        {/* Debug purposes
                        <p className="text-xs text-gray-500 mt-2">
                            Form: {form} | Mega: {isMega ? "Active" : "Inactive"}
                        </p>
                        */}
                    </div>

                  {/* Bottom Dex Entry */}
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-px bg-white/[0.08]"></div>

                        <p className="text-gray-300 text-sm leading-relaxed">
                            This Pokémon can compress water into sharp shuriken.
                        </p>

                        <button className="text-xs text-gray-400 hover:text-white transition-colors">
                            🔊 Playing
                        </button>
                    </div>

                </div>

                {/* RIGHT SIDE - Battle Panel */}
                <div className="flex flex-col items-center justify-start gap-3 pt-3 animate-[pulse_3s_ease-in-out_1]">
                
                {/* Stats Distribution */}
                <div className="-mt-10 mb-2">
                <StatRadar stats={mockStats} />
                <div className="flex flex-col items-center text-xs text-gray-400 mt-1">
                    <span className="tracking-[0.2em] text-[11px] text-gray-500">BASE STAT TOTAL</span>
                    <span className="text-orange-400 text-lg font-semibold">{bst}</span>
                </div>
                </div>

                {/* Type Effectiveness Placeholder */}
                <div className="flex flex-col items-center gap-2 text-sm">

                {/* Weak To*/}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-400 text-xs tracking-wider">WEAK TO</p>

                  <div className="flex flex-wrap justify-center gap-2">
                    <TypeChip type ="Fighting" />
                    <TypeChip type ="Bug" />
                    <TypeChip type ="Grass" />
                    <TypeChip type ="Electric" />
                    <TypeChip type ="Fairy" />
                   </div>
                </div>

                {/* Resistance */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-400 text-xs tracking-wider">RESISTS</p>

                  <div className="flex flex-wrap justify-center gap-2">
                    <TypeChip type ="Ghost" />
                    <TypeChip type ="Steel" />
                    <TypeChip type ="Fire" / >
                    <TypeChip type ="Water" />
                    <TypeChip type ="Ice" />
                    <TypeChip type ="Dark" />
                  </div>
                </div>

                {/* Immune To*/}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-400 text-xs tracking-wider">IMMUNE</p>

                  <div className="flex gap-2">
                    <TypeChip type ="Psychic" />
                  </div>
                </div>

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