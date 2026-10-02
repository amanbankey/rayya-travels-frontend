import VisaHero from "./visa/Hero";
import Destinations from "./visa/Destinations";
import React, { useState } from "react";
import TravelerDetails from "./visa/TravelerDetail";

const Visa = () =>  {
  
     const [show, setShow] = useState(false )
  
  
  
  return(

  <main className="bg-ivory">
    <VisaHero  show={show} setShow={setShow}/>
   
    {show && (<TravelerDetails />)}
  
   <Destinations />
  </main>
);

}

export default Visa;