import { ArrowRight } from "lucide-react";
import { packagesImages, signatureShowcase } from "../../data/packagesData";
import Reveal from "../../components/Reveal";

const SignatureShowcase = () => (
  <section className="bg-darkBlue px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
    <div className="mx-auto max-w-[1200px]">
      <Reveal>
        <div className="grid gap-8 rounded-2xl bg-slate-900/40 p-4 lg:grid-cols-2 lg:gap-10 lg:p-8">
          <div className="h-64 overflow-hidden rounded-xl bg-mist sm:h-80 lg:h-full">
            <img src={packagesImages.showcase} alt={signatureShowcase.title} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center py-2">
            <span className="inline-flex w-fit items-center rounded-full bg-brown/20 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-peach">
              Raaya Signature Showcase
            </span>

            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.15em] text-brown">{signatureShowcase.tag}</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">{signatureShowcase.title}</h2>

            <p className="mt-4 max-w-[500px] text-sm leading-relaxed text-white/75">{signatureShowcase.text}</p>

            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {signatureShowcase.features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.label} className="flex items-center gap-2 text-sm text-white/85">
                    <Icon size={16} className="shrink-0 text-brown" /> {feature.label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-col gap-4 border-t border- pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-white/60">All Inclusive Starting From</p>
                <p className="mt-1 font-serif text-3xl font-medium text-white">
                  ₹{signatureShowcase.price.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-white/50">per person on twin sharing</p>
              </div>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-darkBlue px-6 py-3.5 text-sm font-medium text-white transition-all   hover:shadow-lg">
                Explore Luxury Package <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default SignatureShowcase;