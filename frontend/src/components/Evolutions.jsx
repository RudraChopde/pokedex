// Single Pokemon card
function EvolutionCard({ node, isShiny, onSearch }) {
  return (
    <button
      onClick={() => onSearch(node.name)}
      className="flex flex-col items-center group"
    >
      <div className="w-24 h-24 lg:w-36 lg:h-36 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-orange-500/40">
        <img
          src={isShiny ? (node.shiny_sprite || node.sprite) : node.sprite}
          alt={node.name}
          className="w-20 h-20 lg:w-32 lg:h-32 object-contain"
        />
      </div>
      <p className="text-sm lg:text-base font-semibold text-white mt-3">
        {node.name}
      </p>
    </button>
  );
}

// → arrow for horizontal
function HorizontalConnector({ trigger }) {
  return (
    <div className="flex flex-col items-center justify-center mx-4 gap-1">
      {trigger && (
        <span className="text-orange-300 text-[10px] tracking-wide text-center max-w-[100px]">
          {trigger}
        </span>
      )}
      <span className="text-orange-400 text-xl">→</span>
    </div>
  );
}

// ↓ arrow for vertical
function VerticalConnector({ trigger }) {
  return (
    <div className="flex flex-col items-center my-3 gap-1">
      <span className="text-orange-400 text-xl">↓</span>
      {trigger && (
        <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs tracking-wide text-center max-w-[200px]">
          {trigger}
        </span>
      )}
    </div>
  );
}

// Branch connector — fans out from parent to multiple children
function BranchConnector() {
  return (
    <div className="flex flex-col items-center my-2">
      <div className="w-px h-6 bg-orange-400/50" />
      <div className="w-full h-px bg-orange-400/50" />
      <div className="w-full flex justify-between">
        {/* left and right downward ticks drawn by children */}
      </div>
    </div>
  );
}

function isLinearChain(node) {
  if (node.children.length > 1) return false;
  if (node.children.length === 0) return true;
  return isLinearChain(node.children[0]);
}

// Flatten linear chain into an array for horizontal rendering
function flattenLinear(node, result = []) {
  result.push(node);
  if (node.children.length === 1) {
    flattenLinear(node.children[0], result);
  }
  return result;
}

// Linear chain — horizontal row
function LinearChain({ node, isShiny, onSearch }) {
  const chain = flattenLinear(node);

  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-2">
      {chain.map((n, i) => (
        <div key={n.name} className="flex flex-row items-center">
          <EvolutionCard node={n} isShiny={isShiny} onSearch={onSearch} />
          {i < chain.length - 1 && (
            <HorizontalConnector trigger={chain[i + 1].trigger} />
          )}
        </div>
      ))}
    </div>
  );
}

// Branching node — vertical with fan-out for children
function BranchingChain({ node, isShiny, onSearch }) {
  return (
    <div className="flex flex-col items-center">
      {/* PARENT */}
      <EvolutionCard node={node} isShiny={isShiny} onSearch={onSearch} />

      {node.children.length > 0 && (
        <>
          {/* VERTICAL STEM */}
          <div className="w-px h-8 bg-orange-400/50 mt-3" />

          {/* HORIZONTAL BAR spanning children */}
          <div className={`relative flex ${node.children.length > 4 ? "flex-wrap justify-center" : "flex-row justify-center"} items-start`}>
            {/* the horizontal line */}
            {node.children.length <=4 && (
            <div
              className="absolute top-0 left-0 right-0 h-px bg-orange-400/50"
              style={{ width: "100%" }}
            />
            )}

            {node.children.map((child, i) => (
              <div key={child.name} className="flex flex-col items-center px-4 lg:px-6">
                {/* downward tick from horizontal bar */}
                <div className="w-px h-8 bg-orange-400/50" />

                {/* trigger label */}
                {child.trigger && (
                  <span className="px-2 py-0.5 mb-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[10px] tracking-wide text-center max-w-[120px]">
                    {child.trigger}
                  </span>
                )}

                {/* child card — recurse if it has further evolutions */}
                {isLinearChain(child) && child.children.length > 0 ? (
                  <LinearChain node={child} isShiny={isShiny} onSearch={onSearch} />
                ) : child.children.length > 1 ? (
                  <BranchingChain node={child} isShiny={isShiny} onSearch={onSearch} />
                ) : (
                  <EvolutionCard node={child} isShiny={isShiny} onSearch={onSearch} />
                )}
              </div>
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
    <div className="mt-14 flex flex-col items-center">
      
      {linear ? (
        <LinearChain node={evolutions} isShiny={isShiny} onSearch={onSearch} />
      ) : (
        <BranchingChain node={evolutions} isShiny={isShiny} onSearch={onSearch} />
      )}
    </div>
  );
}