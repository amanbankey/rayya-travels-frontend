import PackagesHero from "./packages/Hero";
import CategoryTabs from "./packages/CategoryTabs";
import TrendingGetaways from "./packages/TrendingGetaways";
import AvailablePackages from "./packages/AvailablePackages";
import SignatureShowcase from "./packages/SignatureShowcase";
import ThematicCollections from "./packages/ThematicCollections";
import CustomItineraryCta from "./packages/CustomItineraryCta";
import PackagesFaq from "./packages/PackagesFaq";
import { useEffect, useRef, useState } from "react";

const Packages = () => { 
   

   const [showData, setShowData] = useState(false)
   const [scrollTick, setScrollTick] = useState(0)
   const resultsRef = useRef(null)

   // Search click: smoothly scroll down to the filters + package cards.
   const handleShowData = (value) => {
     setShowData(value)
     if (value) setScrollTick((tick) => tick + 1)
   }

   useEffect(() => {
     if (!scrollTick) return
     resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
   }, [scrollTick])
  
  
  return (

  <main className="bg-ivory">
    <PackagesHero setShowData={handleShowData} showData={showData} />
    {/* <CategoryTabs /> */}
   
    <div ref={resultsRef} className="scroll-mt-24">
      <AvailablePackages  setShowData={setShowData} showData={showData}/>
    </div>
     <TrendingGetaways />
    <SignatureShowcase />
    <ThematicCollections />
    {/* <CustomItineraryCta /> */}
    {/* <PackagesFaq /> */}
  </main>
) };

export default Packages;