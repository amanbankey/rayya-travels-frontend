import Hero from "./about/HeroSection";
import WhoWeAre from "./about/WhoWeAre";
import Approach from "./about/Approach";
import IataTicketing from "./about/IataTicketing";
import WhyTrust from "./about/WhyTrust";
import BusinessCrew from "./about/BusinessCrew";
import GlobalHorizons from "./about/GlobalHorizons";
import VisionMission from "./about/VisionMission";
import ThoughtfulPlanning from "./about/ThoughtfulPlanning";
import ServicesStrip from "./about/ServicesStrip";
import VisitOffice from "./about/VisitOffice";
import ExploreWorld from "./about/ExploreWorld";

const About = () => (
  <main className="bg-ivory">
    <Hero />
    <WhoWeAre />
    <Approach />
    <IataTicketing />
       <WhyTrust />
    {/* <BusinessCrew /> */}
    {/* <GlobalHorizons /> */}
    <VisionMission />
    {/* <ThoughtfulPlanning /> */}
    {/* <ServicesStrip /> */}
    <VisitOffice />
    {/* <ExploreWorld /> */}
  </main>
);

export default About;