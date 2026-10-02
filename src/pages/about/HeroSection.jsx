import { ArrowDown, ArrowRight } from "lucide-react";
import { aboutImages } from "../../data/aboutData";
import Reveal from "../../components/Reveal";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  
   const navigate = useNavigate()
  return (

  <section className="relative flex min-h-[520px] items-center overflow-hidden bg-darkBlue sm:min-h-[600px] lg:min-h-[697px]">
    <img src={aboutImages.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
    <div className="absolute inset-0 bg-gradient-to-r from-darkBlue via-darkBlue/80 to-darkBlue/40" />

    <div className="relative mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-8 lg:px-20">
      <Reveal>
      

        <h1 className="mt-5 max-w-[780px]  text-4xl leading-[1.25] text-white sm:text-5xl lg:text-6xl lg:leading-[1.2]">
          Your Trusted Partner for Memorable Travel Experiences
        </h1>

        <p className="mt-5 max-w-[680px] text-base leading-relaxed text-white/80 sm:text-lg">
          Reliable, personalized travel solutions designed around your journey, comfort, and convenience.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          
          <button
             onClick={() => navigate("/contact")}
            className="flex items-center justify-center gap-2.5 rounded-sm bg-white/15 px-7 py-4 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/25"
          >
            Contact Us <ArrowRight size={15} />
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);
}
export default Hero;