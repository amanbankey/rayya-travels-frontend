import { Building2, Timer } from "lucide-react";
import { contactImages, contactInfo } from "../../data/contactData";
import Reveal from "../../components/Reveal";

const InquiryInfo = () => (
  <Reveal>
    <div>
      <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brown">
        <span className="h-px w-8 bg-brown" /> Direct Assistance
      </p>

      <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
        Tell Us How We Can <span className="italic">Help</span>
      </h2>

      <p className="mt-6 text-base leading-relaxed text-ink/85">
        Whether you are looking for international flights, diplomatic visa assistance, curated holiday packages,
        corporate travel management, or seamless crew movement, share your itinerary with us.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink/75">
        A dedicated Raaya travel specialist will review your request personally and curate optimal route options
        aligned with your standards.
      </p>

      <div className="mt-8 rounded-md bg-oat p-5 sm:p-6">
        <p className="flex items-center gap-3 border-b border-line pb-4 text-sm font-medium uppercase tracking-[0.08em] text-ink">
          <Building2 size={18} className="shrink-0 text-brown" /> {contactInfo.entity}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink/60">Direct Liaison</p>
            <a href={`tel:${contactInfo.phone}`} className="mt-1 block text-sm font-medium text-ink">
              {contactInfo.phone}
            </a>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink/60">Electronic Mail</p>
            <a href={`mailto:${contactInfo.email}`} className="mt-1 block break-all text-sm font-medium text-ink">
              {contactInfo.email}
            </a>
          </div>
        </div>

        <p className="mt-4 flex items-start gap-3 rounded-sm bg-white px-4 py-3 text-[13px] leading-relaxed text-ink/80">
          <Timer size={16} className="mt-0.5 shrink-0 text-brown" />
          <span>
            <span className="font-medium text-ink">Response Assurance:</span> Typical consultation dispatch within 2–4
            business hours.
          </span>
        </p>
      </div>

      <div className="relative mt-8 h-[220px] overflow-hidden rounded-md bg-mist sm:h-[240px]">
        <img src={contactImages.inquiry} alt="Private travel folio curation" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
        <div className="absolute bottom-0 p-5">
          <p className="font-serif text-xl italic leading-snug text-white sm:text-2xl">
            “Every journey should feel effortless before you even pack.”
          </p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-peach">
            Private Travel Folio Curation
          </p>
        </div>
      </div>
    </div>
  </Reveal>
);

export default InquiryInfo;