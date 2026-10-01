import PackagesHero from "./packages/Hero";
import CategoryTabs from "./packages/CategoryTabs";
import TrendingGetaways from "./packages/TrendingGetaways";
import AvailablePackages from "./packages/AvailablePackages";
import SignatureShowcase from "./packages/SignatureShowcase";
import ThematicCollections from "./packages/ThematicCollections";
import CustomItineraryCta from "./packages/CustomItineraryCta";
import PackagesFaq from "./packages/PackagesFaq";
import { useState } from "react";

const Packages = () => { 
   

   const [showData, setShowData] = useState(false)
  
  
  return (

  <main className="bg-ivory">
    <PackagesHero setShowData={setShowData} showData={showData} />
    {/* <CategoryTabs /> */}
    <TrendingGetaways />
    <AvailablePackages  setShowData={setShowData} showData={showData}/>
    <SignatureShowcase />
    <ThematicCollections />
    {/* <CustomItineraryCta /> */}
    {/* <PackagesFaq /> */}
  </main>
) };

export default Packages;