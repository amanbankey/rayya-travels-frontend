import { ArrowRight, Calendar, Mail, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Reveal from "../Reveal";
import { legalLinks, legalMeta } from "../../data/legalData";

const Section = ({ section, index }) => (
  <section id={section.id} className="scroll-mt-28 border-b border-darkBlue/10 pb-8 last:border-b-0 last:pb-0">
    <h2 className="flex items-baseline gap-3  text-xl font-medium text-darkBlue sm:text-2xl">
      <span className="text-sm font-semibold text-aviationBrown">{String(index + 1).padStart(2, "0")}</span>
      {section.title}
    </h2>

    {section.paragraphs?.map((text) => (
      <p key={text} className="mt-3 text-sm leading-relaxed text-darkBlue/75 sm:text-[15px]">
        {text}
      </p>
    ))}

    {section.list && (
      <ul className="mt-4 space-y-2.5">
        {section.list.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-darkBlue/75 sm:text-[15px]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aviationBrown" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}

    {section.table && (
      <div className="mt-4 overflow-x-auto rounded-xl border border-darkBlue/10">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-darkBlue text-white">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em]">Type</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em]">Purpose</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em]">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-darkBlue/10">
            {section.table.map((row) => (
              <tr key={row.type} className="align-top">
                <td className="px-4 py-3 font-semibold text-darkBlue">{row.type}</td>
                <td className="px-4 py-3 leading-relaxed text-darkBlue/75">{row.purpose}</td>
                <td className="px-4 py-3 text-darkBlue/75">{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {section.note && (
      <p className="mt-4 rounded-xl border-l-4 border-aviationBrown bg-darkBlue/5 px-4 py-3 text-sm font-medium text-darkBlue">
        {section.note}
      </p>
    )}
  </section>
);

const LegalLayout = ({ page }) => {
  const { pathname } = useLocation();

  return (
    <main className="bg-darkBlue50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-darkBlue">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          // style={{
          //   background:
          //     "radial-gradient(circle at 85% 20%, rgba(161,59,0,0.35), transparent 40%), radial-gradient(circle at 10% 90%, rgba(161,59,0,0.18), transparent 35%)",
          // }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <Reveal>
            <nav className="flex items-center gap-2 text-xs text-white/60" aria-label="Breadcrumb">
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">{page.title}</span>
            </nav>

            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-aviationBrown">
              {page.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl  text-4xl font-medium leading-tight text-white sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{page.intro}</p>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80">
              <Calendar size={13} className="text-aviationBrown" /> Last updated: {legalMeta.updated}
            </span>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 lg:px-12 lg:py-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-darkBlue/10 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-darkBlue/50">On this page</p>
            <ol className="mt-3 space-y-1 lg:max-h-[55vh] lg:overflow-y-auto">
              {page.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-2.5 rounded-lg px-2 py-1.5 text-sm text-darkBlue/75 transition-colors hover:bg-darkBlue/5 hover:text-aviationBrown"
                  >
                    <span className="w-5 shrink-0 text-xs font-semibold text-aviationBrown">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 hidden rounded-2xl border border-darkBlue/10 bg-white p-5 shadow-sm lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-darkBlue/50">Other policies</p>
            <ul className="mt-3 space-y-1">
              {legalLinks
                .filter((link) => link.path !== pathname)
                .map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-darkBlue/75 transition-colors hover:bg-darkBlue/5 hover:text-aviationBrown"
                    >
                      {link.name} <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <Reveal>
            <article className="space-y-8 rounded-2xl border border-darkBlue/10 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
              {page.sections.map((section, index) => (
                <Section key={section.id} section={section} index={index} />
              ))}
            </article>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col gap-5 rounded-2xl bg-darkBlue p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className=" text-xl font-medium sm:text-2xl">Have a question?</h3>
                <p className="mt-1.5 max-w-md text-sm text-white/70">
                  Our team at {legalMeta.company} is happy to help with any question about this page.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <a
                  href={`mailto:${legalMeta.email}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-aviationBrown px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-darkBlue"
                >
                  <Mail size={15} /> {legalMeta.email}
                </a>
                <a
                  href={`tel:${legalMeta.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone size={15} /> {legalMeta.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
};

export default LegalLayout;
