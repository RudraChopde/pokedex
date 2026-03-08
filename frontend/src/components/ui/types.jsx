const typeColors = {
  normal: "bg-zinc-500/20 text-zinc-300",
  fire: "bg-red-500/20 text-red-400",
  water: "bg-blue-500/20 text-blue-400",
  electric: "bg-yellow-400/20 text-yellow-300",
  grass: "bg-green-500/20 text-green-400",
  ice: "bg-cyan-400/20 text-cyan-300",
  fighting: "bg-orange-500/20 text-orange-400",
  poison: "bg-purple-500/20 text-purple-300",
  ground: "bg-amber-600/20 text-amber-400",
  flying: "bg-indigo-400/20 text-indigo-300",
  psychic: "bg-pink-500/20 text-pink-300",
  bug: "bg-lime-500/20 text-lime-400",
  rock: "bg-yellow-700/20 text-yellow-500",
  ghost: "bg-violet-500/20 text-violet-300",
  dragon: "bg-indigo-600/20 text-indigo-400",
  dark: "bg-slate-500/20 text-slate-300",
  steel: "bg-gray-400/20 text-gray-300",
  fairy: "bg-pink-400/20 text-pink-300"
};

function TypeChip({ type }) {
  const style = typeColors[type.toLowerCase()] || "bg-gray-500/20 text-gray-300";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs tracking-wide capitalize ${style}`}
    >
      {type}
    </span>
  );
}

export default TypeChip;