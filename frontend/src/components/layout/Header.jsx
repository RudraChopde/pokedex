import { useEffect, useState } from "react";
import { Search } from "lucide-react";
function Header({onSearch})
{
    const [query, setQuery] = useState("");
    const [allPokemon, setAllPokemon] = useState([]);
    const [suggest, setSuggest] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleSearch = () =>
    {
        if (query.trim() !== "")
        {
            onSearch(query.trim());
            setSuggest([]);
        }
    };

    const KeyDown = (e) =>
    {
        if (e.key === "ArrowDown")
        {
            e.preventDefault();

            setSelectedIndex((prev) =>
                prev < suggest.length - 1 ? prev + 1 : 0
            );
        }
        else if (e.key === "ArrowUp")
        {
            e.preventDefault();

            setSelectedIndex((prev) =>
                prev > 0 ? prev - 1 : suggest.length - 1
            );
        }
        else if(e.key === "Enter")
        {
            if(selectedIndex >=0)
            {
                const selected = suggest[selectedIndex]

                setQuery(selected);
                setSuggest([]);
                onSearch(selected);
            }
            else
            {
                handleSearch();
            }

        }
    };

    useEffect(() => {
        fetch("http://localhost:8000/pokemon-list")
        .then((res) => res.json())
        .then((data) => setAllPokemon(data))
        .catch((err) => console.error(err));
    }, []);

    console.log(suggest);
    console.log(allPokemon);

    return(
        <div className="mb-10 relative z-50">
            <div className="h-14 overflow-visible bg-[#161b22] rounded-2xl flex items-center px-6 shadow-inner border border-white/5
                            focus-within: border-white/20 transition-color duratio-200">
                <input type="text"
                    placeholder="Search Pokemon......"
                    value={query}
                    onChange={(e) => {
                        const value = e.target.value;
                        setQuery(value);

                        if(!value.trim())
                        {
                            setSuggest([])
                            return;
                        }

                        const filter = allPokemon
                                .filter((pokemon) =>
                                        pokemon.toLowerCase().startsWith(value.toLowerCase())
                                ).slice(0,5);

                        console.log(filter);   
                        setSuggest(filter); 
                        setSelectedIndex(-1);                  
                    }}
                    onKeyDown={KeyDown}
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm tracking-wide appearance-none"
                    style={{ color: "#e5e7eb" }}
                />

                <button onClick={handleSearch}
                    className="ml-4 text-gray-500 hover:text-white transition-colors duration-200">
                    <Search size={18}/>    
                </button>
            </div>

                {suggest.length > 0 && (
                    <div className="absolute top-full left-0 mt-3 w-full bg-[#1a1f2b]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">

                        {suggest.map((pokemon, index) => (
                        <button
                            key={pokemon}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setQuery(pokemon);
                                setSuggest([]);

                                onSearch(pokemon);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition ${
                            selectedIndex === index
                                ? "bg-white/10 text-white"
                                : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            {pokemon}
                        </button>
                        ))}

                    </div>
                )}
        </div>
               
    );
}

export default Header;
