export default function Evolution({ evolutions, isShiny }) {
  if (!evolutions || evolutions.length === 0) return null;

  return (
    <div className="mt-14 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-10 tracking-wide">
        Evolution Chain
      </h2>

      <div className="flex flex-col sm:flex-row sm:flex-wrap
                      lg:flex-nowrap items-center justify-center gap-6 pb-2">
        {evolutions.map((evo, index) => (
          <div
            key={evo.name}
            className="flex items-center"
          >
            {/* CARD */}
            <div className="flex flex-col items-center group">
              <div className="w-28 h-28 lg:w-40 h-40 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-orange-500/40, group-hover:shadow-[0_0_30px_rgba(255,106,0,0.15)]">
                <img
                  src={isShiny ?(evo.shiny_sprite || evo.sprite)
                    : evo.sprite
                  }
                  alt={evo.name}
                  className="w-24 h-24 lg:w-32 h-32 object-contain"
                />
              </div>

              <p className="text-base lg:text-xl font-semibold text-white mt-4">
                {evo.name}
              </p>
            </div>

            {/* CONNECTOR */}
            {index < evolutions.length - 1 && (
              <div className="flex flex-col items-center mx-4">
                <div className="w-12 h-[2px] bg-white/10 relative">
                  <div className="absolute right-0 -top-[5px] text-white">
                    <span className="hidden sm:inline">→</span>
                    <span className="sm:hidden">↓</span>
                  </div>
                </div>

                <p className="text-xs text-orange-400 mt-3 tracking-wide">
                  {evolutions[index + 1].trigger}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}