import { FiChevronRight } from "react-icons/fi";

export const Breadcrumb = ({ items = [], badge }) => (
  <div className="flex flex-wrap items-center gap-1.5 text-sm">
    {items.map((item, i) => {
      const last = i === items.length - 1;
      return (
        <span key={item + i} className="flex items-center gap-1.5">
          <span className={last ? "font-serif text-lg font-semibold text-navy-900" : "text-stone-400"}>{item}</span>
          {!last && <FiChevronRight className="text-ember-400" size={14} />}
        </span>
      );
    })}
    {badge && (
      <span className="ml-2 rounded-full bg-ember-50 px-3 py-1 text-xs font-semibold text-ember-700 ring-1 ring-inset ring-ember-200">{badge}</span>
    )}
  </div>
);

export default Breadcrumb;
