function EvolutionConnector({ trigger }) {
  return (
    <div className="flex flex-col items-center my-4">

      <div className="text-orange-400 text-xl leading-none">
        ↓
      </div>

      {trigger && (
        <div
          className="
            px-3 py-1 my-2
            rounded-full
            bg-orange-500/10
            border border-orange-500/20
            text-orange-300
            text-xs lg:text-sm
            tracking-wide
            text-center
            max-w-[220px]
          "
        >
          {trigger}
        </div>
      )}

      <div className="text-orange-400 text-xl leading-none">
        ↓
      </div>

    </div>
  );
}

function isLinearChain(node) {
  if (node.children.length > 1) {
    return false;
  }

  if (node.children.length === 0) {
    return true;
  }

  return isLinearChain(node.children[0]);
}

function EvolutionNode({ node, isShiny, onSearch }) {
  return (
    <div className="flex flex-col items-center">
      {/* Button*/}
      <button onClick={() => onSearch(node.name)}
              className="flex flex-col items-center group">
        <div
          className="
            w-28 h-28 lg:w-40 lg:h-40
            rounded-2xl
            bg-white/[0.03]
            border border-white/[0.05]
            flex items-center justify-center
            transition-all duration-300
            group-hover:scale-105
            group-hover:border-orange-500/40
          "
        >
          <img
            src={
              isShiny
                ? (node.shiny_sprite || node.sprite)
                : node.sprite
            }
            alt={node.name}
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
          />
        </div>

        <p className="text-base lg:text-xl font-semibold text-white mt-4">
          {node.name}
        </p>

      </button>

      {/* CHILDREN */}
      {node.children.length > 0 && (
        <>
          {/* CONNECTOR */}
          <EvolutionConnector trigger={node.children[0]?.trigger} />

          {/* BRANCHES */}
          <div
            className="
              flex flex-col sm:flex-row
              flex-wrap justify-center
              gap-8
            "
          >
            {node.children.map((child) => (
              <EvolutionNode
                key={child.name}
                node={child}
                isShiny={isShiny}
                onSearch={onSearch}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Evolutions({ evolutions, isShiny, onSearch }) {
  if (!evolutions) return null;
  const linear = isLinearChain(evolutions);

  return (
    <div className={`mt-14 flex ${linear ? 
                    "flex-row flex-wrap justify-center items-center gap-4 lg:gap-8" 
                    : "flex-col items-center"} `}>
      <h2 className="text-3xl font-bold text-white mb-10 tracking-wide">
        Evolution Chain
      </h2>

      <EvolutionNode
        node={evolutions}
        isShiny={isShiny}
        onSearch={onSearch}
      />
    </div>
  );
}