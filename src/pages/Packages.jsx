import PackagesHero from "./packages/Hero";
import CategoryTabs from "./packages/CategoryTabs";
import TrendingGetaways from "./packages/TrendingGetaways";
import AvailablePackages from "./packages/AvailablePackages";
import SignatureShowcase from "./packages/SignatureShowcase";
import ThematicCollections from "./packages/ThematicCollections";
import CustomItineraryCta from "./packages/CustomItineraryCta";
import PackagesFaq from "./packages/PackagesFaq";

const Packages = () => (
  <main className="bg-ivory">
    <PackagesHero />
    {/* <CategoryTabs /> */}
    <TrendingGetaways />
    <AvailablePackages />
    <SignatureShowcase />
    <ThematicCollections />
    {/* <CustomItineraryCta /> */}
    {/* <PackagesFaq /> */}
  </main>
);

export default Packages;