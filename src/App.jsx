import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import EditorialIntro from "./components/EditorialIntro";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <EditorialIntro />
    </div>
  );
}

export default App;
