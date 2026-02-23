import { useState } from "react";
import { Search } from "lucide-react";
function Header({onSearch})
{
    const [query, setQuery] = useState("");

    const handleSearch = () =>
    {
        if (query.trim() !== "")
        {
            onSearch(query.trim());
        }
    };

    const KeyDown = (e) =>
    {
        if(e.key === "Enter")
        {
            handleSearch();
        }
    };

    return(
        <div className="mb-10">
            <div className="h-14 bg-[#161b22] rounded-2xl flex items-center px-6 shadow-inner border border-white/5
                            focus-within: border-white/20 transition-color duratio-200">
                <input type="text"
                    placeholder="Search Pokemon......"
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)}
                    onKeyDown={KeyDown}
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm tracking-wide appearance-none"
                    style={{ color: "#e5e7eb" }}
                />

                <button onClick={handleSearch}
                    className="ml-4 text-gray-500 hover:text-white transition-colors duration-200">
                    <Search size={18}/>    
                </button>
            </div>
        </div>       
    );
}

export default Header;
