import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import EditorialIntro from "./components/EditorialIntro";
import Accommodation from "./components/Accommodation";
import EventVenues from "./components/EventVenues";
import RooftopPool from "./components/RooftopPool";
import SignatureRestaurant from "./components/SignatureRestaurant";
import EventsWeHost from "./components/EventsWeHost";
import WaterPark from "./components/WaterPark";
import WaterParkGallery from "./components/WaterParkGallery";
import Footer from "./components/Footer";

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
      <EventsWeHost />
      <WaterPark />
      <WaterParkGallery />
      <Footer />
    </div>
  );
}

export default App;
