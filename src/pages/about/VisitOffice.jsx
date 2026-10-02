import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { office } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const labelClass = "text-[11px] font-medium uppercase tracking-[0.12em] text-ink/70";

const VisitOffice = () => (
  <section id="contact" className="bg-ivory px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
    <Reveal>
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 rounded-3xl bg-oat p-6 sm:p-10 lg:grid-cols-2 lg:gap-10 lg:p-14">
        <div>
          <h2 className="mt-4  text-4xl text-ink sm:text-5xl">Visit RAAYA Travels</h2>

          <p className="mt-1 text-lg font-medium text-ink">{office.entity}</p>

          <p className={`mt-4 ${labelClass}`}>Headquarters</p>
          <p className="mt-1 text-base leading-relaxed text-ink/85">{office.address}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-sm bg-white px-4 py-4">
              <Phone size={20} className="shrink-0 text-brown" />
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink/70">Telephone</p>
                <a href={`tel:${office.phone}`} className="text-base font-medium text-ink">
                  {office.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-sm bg-white px-4 py-4">
              <Mail size={20} className="shrink-0 text-brown" />
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink/70">Email Correspondence</p>
                <a href={`mailto:${office.email}`} className="block break-all text-base font-medium text-ink">
                  {office.email}
                </a>
              </div>
            </div>
          </div>

          {/* <a
            href={`mailto:${office.email}`}
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-brown px-7 py-4 text-xs font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-[#8b6538] hover:shadow-lg"
          >
            Contact Us <ArrowRight size={14} />
          </a> */}
        </div>

        <div className="relative h-[300px] overflow-hidden rounded-2xl bg-[#efece7] shadow-md sm:h-[360px] lg:h-[400px]">
          <iframe
            title="Raaya Travels office location"
            src={office.mapUrl}
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
          <div className="absolute inset-x-4 bottom-4 flex items-start gap-2 rounded-sm bg-white px-4 py-3 shadow-md">
            <MapPin size={16} className="mt-1 shrink-0 text-brown" />
            <div className="min-w-0">
              <p className="text-base font-medium text-ink">{office.place}</p>
              <p className="text-sm text-ink/75">{office.placeNote}</p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default VisitOffice;