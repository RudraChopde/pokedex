import { useState, useRef } from "react";
import Header from "./components/layout/Header";
import ContentWrapper from "./components/layout/ContentWrapper";

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
    setSearchQuery(query);

    setTimeout(() => {
      setMode("loading");

      const holdDuration = 3000 + Math.random() * 2000;

      setTimeout(() => {
        setMode("pokemon");
      }, holdDuration);

    }, 2000); // <-- tiny pause before slide
};


  return (
    <div className="min-h-screen overflow-hidden bg-[#0f1117] text-white flex items-center justify-center">
      <div className="w-full max-w-6xl px-6">
        <Header onSearch={handleSearch} />
        <ContentWrapper
          mode={mode}
          searchQuery={searchQuery}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}

export default App;