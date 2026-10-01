const tone = (status = "") => {
  const s = String(status).toLowerCase();
  if (/(ticketed|success|complete|approved|credit|paid|active|issued|confirmed|live)/.test(s))
    return { cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" };
  if (/(fail|action|cancel|reject|debit|blocked|refund|inactive|error)/.test(s))
    return { cls: "bg-red-50 text-red-600 ring-red-200", dot: "bg-red-500" };
  if (/(process|pending|review|hold|await|progress|open)/.test(s))
    return { cls: "bg-ember-50 text-ember-700 ring-ember-200", dot: "bg-ember-500" };
  return { cls: "bg-navy-50 text-navy-700 ring-navy-200", dot: "bg-navy-400" };
};

export const StatusBadge = ({ status }) => {
  const t = tone(status);
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${t.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
