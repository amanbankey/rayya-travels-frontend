import VisaHero from "./visa/Hero";
import Destinations from "./visa/Destinations";
import React, { useEffect, useRef, useState } from "react";
import TravelerDetails from "./visa/TravelerDetail";

const Visa = () =>  {
  
     const [show, setShow] = useState(false )
     const [scrollTick, setScrollTick] = useState(0)
     const resultsRef = useRef(null)

     // Search click: smoothly scroll down to the traveller form.
     const handleShow = (value) => {
       setShow(value)
       if (value) setScrollTick((tick) => tick + 1)
     }

     useEffect(() => {
       if (!scrollTick) return
       resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
     }, [scrollTick])
  
  
  
  return(

  <main className="bg-ivory">
    <VisaHero  show={show} setShow={handleShow}/>
   
    {/* <div ref={resultsRef} className="scroll-mt-24">
      {show && (<TravelerDetails />)}
    </div> */}
  
   <Destinations />
  </main>
);

}

export default Visa;