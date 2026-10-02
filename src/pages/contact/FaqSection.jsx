import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/contactData";
import Reveal from "../../components/Reveal";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-oat px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[720px]">
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Clarity & Assurance</p>
            <h2 className="mt-3  text-3xl text-ink sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
            <p className="mx-auto mt-4 max-w-[400px] text-sm leading-relaxed text-ink/70">
              Clear answers about connecting with Raaya Travels and commissioning our specialized travel folios.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={faq.question} delay={index * 60}>
                <div className="rounded-md bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="text-[15px] font-medium text-ink">{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-brown transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink/75">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;