import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import EditorialIntro from "./components/EditorialIntro";
import Accommodation from "./components/Accommodation";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <EditorialIntro />
      <Accommodation />
    </div>
  );
}

export default App;
