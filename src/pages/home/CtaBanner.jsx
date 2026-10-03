import Reveal from "../../components/Reveal";

const CtaBanner = () => (
  <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
    <Reveal>
      <div className="flex flex-col gap-6 rounded-2xl bg-soft p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-lg">
          {/* <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-muted">Private Client Advisory</p> */}
          <h2 className="mt-3  text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Architect your next departure.
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Connect directly with our curatorial directors in Zürich, London, or Kyoto to draft a private manifest
            tailored to your party.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="glow-btn rounded-lg bg-dark px-6 py-3.5 text-[9px] font-medium uppercase tracking-[0.2em] text-paper transition-colors hover:bg-ink">
            Inquire Now
          </button>
          {/* <button className="rounded-lg border border-line bg-paper px-6 py-3.5 text-[9px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink">
            Review 2025 Lookbook
          </button> */}
        </div>
      </div>
    </Reveal>
  </section>
);

export default CtaBanner;