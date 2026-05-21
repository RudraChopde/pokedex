import SplashScreen from "./pages/SplashScreen";
import { useState, useRef } from "react";
import Header from "./components/layout/Header";
import ContentWrapper from "./components/layout/ContentWrapper";
import HubScreen from "./pages/HubScreen";
import Sidebar from "./components/layout/Sidebar"

function App() {
  const [page, setPage] = useState("splash");
  const [mode, setMode] = useState("home");
  const [searchQuery, setSearchQuery] = useState(null);
  const timeoutRef = useRef(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const handleBack = () => {
  setMode("home");
  setSearchQuery(null);
  };

  const handleSearch = (query) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setError(null);
  
    setMode("loading");
    setSearchQuery(query);
};

if (page === "splash") {
  return <SplashScreen onEnter={() => setPage("hub")} />;
}

if(page == "hub") {
  return <HubScreen onNavigate={(p) => setPage(p)}/>;
}

  return (
  <div className="min-h-screen overflow-y-auto bg-[#0f1117] text-white flex justify-center py-10">
    
    <Sidebar
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      onNavigate={(p) => { setPage(p); setSidebarOpen(false); }}
      currentPage="pokedex"
    />

    {/* HAMBURGER ICON*/}
    <button
      onClick={() => setSidebarOpen(true)}
      className="fixed top-6 left-6 z-30 text-gray-400 hover:text-white transition-colors"
    >
      ☰
    </button>

    <div className="w-full max-w-6xl px-6">
      <Header onSearch={handleSearch} />
      <ContentWrapper
        mode={mode}
        searchQuery={searchQuery}
        onBack={handleBack}
        onSearch={handleSearch}
        onSearchError={(q) => { setError(q); setMode("error"); }}
        onSearchComplete={() => setMode("pokemon")}
      />
    </div>
  </div>
);
}

export default App;