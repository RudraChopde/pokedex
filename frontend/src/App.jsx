import Header from "./components/layout/Header"
import ContentWrapper from "./components/layout/ContentWrapper";

function App()
{
  return(
    <div classname = "min-h-screen bg-[#0f1117] text-gray-200 flex justify-center">
      <div className="w-full-max-w-6xl px-6 py-8">
        <Header/>
        <ContentWrapper/>
      </div>
    </div>
  );
}

export default App