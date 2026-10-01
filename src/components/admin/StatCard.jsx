export const StatCard = ({ label, value, valueClass = "text-gray-900", dark = false }) => (
  <div
    className={`rounded-xl p-4 border ${
      dark ? "bg-[#0B1E3E] border-transparent" : "bg-white border-gray-200"
    }`}
  >
    <p className={`text-[11px] font-semibold tracking-wide mb-1 ${dark ? "text-gray-300" : "text-gray-400"}`}>
      {label}
    </p>
    <p className={`text-xl font-bold ${dark ? "text-white" : valueClass}`}>{value}</p>
  </div>
);