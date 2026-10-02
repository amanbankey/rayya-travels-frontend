import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { packagesFaqs } from "../../data/packagesData";
import Reveal from "../../components/Reveal";

const PackagesFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-ivory px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Travel Advisory & Assistance</p>
            <h2 className="mt-2  text-3xl text-ink sm:text-4xl">Frequently Asked Questions</h2>
          </div>
        </Reveal>

        <div className="mt-8 space-y-3">
          {packagesFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={faq.question} delay={index * 60}>
                <div className="rounded-lg bg-oat">
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="text-[15px] font-medium text-ink">{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-ink/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink/75 sm:px-6">{faq.answer}</p>
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

export default PackagesFaq;