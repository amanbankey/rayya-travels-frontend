const SectionHeader = ({ eyebrow, title, text, children }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-xl">
      <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-muted">{eyebrow}</p>
      <h2 className="mt-2  text-3xl font-medium text-ink sm:text-4xl">{title}</h2>
      {text && <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{text}</p>}
    </div>
    {children && <div className="shrink-0">{children}</div>}
  </div>
);

export default SectionHeader;