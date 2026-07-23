import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import EditorialIntro from "./components/EditorialIntro";
import Accommodation from "./components/Accommodation";
import EventVenues from "./components/EventVenues";
import RooftopPool from "./components/RooftopPool";
import SignatureRestaurant from "./components/SignatureRestaurant";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <EditorialIntro />
      <Accommodation />
      <EventVenues />
      <RooftopPool />
      <SignatureRestaurant />
    </div>
  );
}

export default App;
