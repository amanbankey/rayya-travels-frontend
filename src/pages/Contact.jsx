import { useState } from "react";
import ContactHero from "./contact/Hero";
import ContactCards from "./contact/ContactCards";
import InquiryInfo from "./contact/InquiryInfo";
import InquiryForm from "./contact/InquiryForm";
import HeadOffice from "./contact/HeadOffice";
import HelpPathways from "./contact/HelpPathways";
import ConnectChannels from "./contact/ConnectChannels";
import FaqSection from "./contact/FaqSection";
import ReadyCta from "./contact/ReadyCta";


const Contact = () => {
  const [service, setService] = useState("");

  const handlePathwaySelect = (value) => {
    setService(value);
    document.getElementById("inquiry").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-ivory">
      <ContactHero />
      <ContactCards />

      <section id="inquiry" className="px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1150px] items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <InquiryInfo />
          <InquiryForm service={service} onServiceChange={setService} />
        </div>
      </section>

      <HeadOffice />
      <HelpPathways onSelect={handlePathwaySelect} />
            <ConnectChannels />
      <FaqSection />
      <ReadyCta />
    </main>
  );
};

export default Contact;