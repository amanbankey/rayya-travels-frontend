export const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-emerald-50 text-emerald-600",
    Rejected: "bg-red-50 text-red-500",
    Pending: "bg-amber-50 text-amber-600",
    Ticketed: "bg-emerald-50 text-emerald-600",
    Processing: "bg-amber-50 text-amber-600",
    "Action Req.": "bg-red-50 text-red-500",
  };
  const dots = {
    Approved: "bg-emerald-500",
    Rejected: "bg-red-500",
    Pending: "bg-amber-500",
    Ticketed: "bg-emerald-500",
    Processing: "bg-amber-500",
    "Action Req.": "bg-red-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || "bg-gray-400"}`} /> {status}
    </span>
  );
};