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

        {node.trigger && (
          <p className="text-xs text-orange-400 mt-2 tracking-wide">
            {node.trigger}
          </p>
        )}
      </button>

      {/* CHILDREN */}
      {node.children.length > 0 && (
        <>
          {/* CONNECTOR */}
          <div className="w-[2px] h-8 bg-white/10 my-4" />

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

  return (
    <div className="mt-14 flex flex-col items-center">
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