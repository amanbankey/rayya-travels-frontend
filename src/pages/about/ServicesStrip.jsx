import { Fragment } from "react";
import { services } from "../../data/aboutData";

const ServicesStrip = () => (
  <section id="services" className="bg-dark">
    <ul className="no-scrollbar mx-auto flex max-w-[1440px] items-center gap-5 overflow-x-auto px-4 py-5 sm:px-8 lg:justify-center lg:gap-7">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Fragment key={service.label}>
            <li className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs font-medium uppercase tracking-[0.15em] text-white/85">
              <Icon size={15} className="text-peach" /> {service.label}
            </li>
            {index < services.length - 1 && <li className="h-1.5 w-1.5 shrink-0 rounded-full bg-sand" aria-hidden="true" />}
          </Fragment>
        );
      })}
    </ul>
  </section>
);

export default ServicesStrip;