import { ArrowDown, Phone } from "lucide-react";
import { contactImages, contactInfo } from "../../data/contactData";
import Reveal from "../../components/Reveal";

const ContactHero = () => (
  <section className="relative overflow-hidden bg-dark pb-40 pt-20 sm:pb-44 sm:pt-28 lg:pb-48">
    <img src={contactImages.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
    <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/75 to-dark/30" />

    <div className="relative mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-16">
      <Reveal>
       

        <h1 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Let’s Plan Your <span className="italic text-peach">Journey</span>
        </h1>

        <p className="mt-5 max-w-[600px] text-base leading-relaxed text-white/85 sm:text-lg">
          Have a question, need travel assistance, or ready to plan your next trip? Our dedicated concierge team at
          Raaya Travels is here to assist with refined precision.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#inquiry"
            className="flex items-center justify-center gap-2.5 rounded-sm bg-brown px-7 py-4 text-sm font-medium text-white transition-all hover:bg-[#8b6538] hover:shadow-lg"
          >
            Start an Inquiry <ArrowDown size={15} />
          </a>
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center justify-center gap-2.5 rounded-sm bg-white/15 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white/25"
          >
            <Phone size={15} className="text-peach" /> {contactInfo.phone}
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ContactHero;