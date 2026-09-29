import { ArrowRight, Phone } from "lucide-react";
import { contactInfo } from "../../data/contactData";
import Reveal from "../../components/Reveal";

const ReadyCta = () => {
  const handleInquiryScroll = () => {
    document
      .getElementById("inquiry")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#0b1628] px-4 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="absolute -right-20 top-0 h-56 w-72 bg-white/5 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-56 w-72 bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-[900px] text-center">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-peach">
            Quiet Luxury • Flawless Execution
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Ready to Start Your <span className="italic text-peach">Journey?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[480px] text-base leading-relaxed text-white/80">
            Share your travel plans with Raaya Travels and let our senior
            concierge team architect every detail of your itinerary.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={handleInquiryScroll}
              className="flex w-full items-center justify-center gap-2.5 rounded-md bg-[#7a5832] px-7 py-4 text-sm font-medium text-white shadow-lg transition-all hover:bg-[#8b6538] sm:w-auto"
            >
              Send an Inquiry <ArrowRight size={15} />
            </button>

            <a
              href={`tel:${contactInfo.phone}`}
              className="flex w-full items-center justify-center gap-2.5 rounded-md bg-[#1e2738] px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#2a3448] sm:w-auto"
            >
              <Phone size={15} className="text-peach" /> Call {contactInfo.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ReadyCta;