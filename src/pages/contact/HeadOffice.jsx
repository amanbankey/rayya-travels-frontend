import { useState } from "react";
import { Building2, Clock, Copy, ExternalLink, Mail, Phone } from "lucide-react";
import { contactInfo } from "../../data/contactData";
import Reveal from "../../components/Reveal";

const HeadOffice = () => {
  const [copied, setCopied] = useState(false);



  return (
    <section id="office" className="px-4 py-16 sm:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Headquarters</p>
          <h2 className="mt-3  text-4xl text-ink sm:text-5xl">Visit Our Head Office</h2>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <article className="h-full rounded-md bg-white p-6 shadow-lg sm:p-8 transition-shadow duration-300 hover:ring-1 hover:ring-darkBlue">
              <div className="flex items-center gap-4 border-b border-line pb-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-oat text-brown">
                  <Building2 size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-darkBlue">Registered Legal Entity</p>
                  <h3 className="text-lg font-medium text-darkBlue sm:text-xl">{contactInfo.entity}</h3>
                </div>
              </div>

              <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.1em] text-darkBlue">Corporate Address</p>
              <p className="mt-2 text-base leading-relaxed text-darkBlue/80">{contactInfo.address}</p>

              <ul className="mt-6 space-y-3 text-base text-darkBlue">
                <li className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-brown" />
                  <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-brown" />
                  <a href={`mailto:${contactInfo.email}`} className="break-all">
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-ink/80">
                  <Clock size={17} className="mt-0.5 shrink-0 text-brown" />
                  {contactInfo.hours}
                </li>
              </ul>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
               
                <a 
                  href={contactInfo.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-sm bg-brown py-3.5 text-sm font-medium text-white transition-all hover:bg-[#8b6538] hover:shadow-lg"
                >
                  Navigate <ExternalLink size={15} />
                </a>
              </div>
            </article>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative h-[380px] overflow-hidden rounded-md bg-oat shadow-lg sm:h-[420px] lg:h-full lg:min-h-[410px]">
              <iframe
                title="Raaya Travels head office map"
                src={contactInfo.mapEmbed}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />

              <p className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-sm bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-md">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brown" />
                <span className="truncate">RAAYA Head Office • Alphathum C-Block</span>
              </p>

              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-sm bg-white px-4 py-3 shadow-md sm:left-auto sm:w-[400px] sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-darkBlue">Sector 90 Metro Corridor</p>
                  <p className="text-sm font-medium text-darkBlue">Bhutani Alphathum Tower C</p>
                </div>
                 <a
                  href={contactInfo.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-sm bg-brown px-4 py-2.5 text-center text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-ink"
                >
                  Open Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeadOffice;