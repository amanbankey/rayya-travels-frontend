export const StatCard = ({ label, value, valueClass = "text-navy-900", dark = false }) => (
  <div
    className={`group rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
      dark
        ? "border-transparent bg-gradient-to-br from-navy-900 to-navy-700 shadow-lg shadow-navy-900/20"
        : "border-stone-200 bg-white shadow-card hover:shadow-[0_18px_40px_-20px_rgba(168,64,0,0.35)]"
    }`}
  >
    <p className={`mb-1 text-[11px] font-semibold uppercase tracking-wider ${dark ? "text-navy-200" : "text-stone-400"}`}>{label}</p>
    <p className={`font-serif text-2xl font-semibold ${dark ? "text-white" : valueClass}`}>{value}</p>
  </div>
);
