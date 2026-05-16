import { useState, useRef } from "react";
import Header from "./components/layout/Header";
import ContentWrapper from "./components/layout/ContentWrapper";
import Evolution from "./components/Evolutions";
import { LoaderPinwheel } from "lucide-react";

function App() {
  const [mode, setMode] = useState("home");
  const [searchQuery, setSearchQuery] = useState(null);
  const timeoutRef = useRef(null);
  
  const handleBack = () => {
  setMode("home");
  setSearchQuery(null);
  };

  const handleSearch = (query) => {
    if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
    }

    setMode("loading");
    setSearchQuery(query);
};


  return (
    <div className="min-h-screen overflow-y-auto bg-[#0f1117] text-white flex justify-center py-10">
      <div className="w-full max-w-6xl px-6">
        <Header onSearch={handleSearch} />
        <ContentWrapper
          mode={mode}
          searchQuery={searchQuery}
          onBack={handleBack}
          onSearchComplete={() => setMode("pokemon")}
        />
      </div>
    </div>
  );
}

export default App;