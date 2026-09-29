import { useState } from "react";
import { categoryTabs } from "../../data/packagesData";

const CategoryTabs = () => {
  const [active, setActive] = useState("trending");

  return (
    <section className="border-b border-line bg-ivory px-4 py-3 sm:px-8 lg:px-12">
      <div className="no-scrollbar mx-auto flex max-w-[1300px] gap-2 overflow-x-auto">
        {categoryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                isActive
                  ? "border-dark bg-dark text-white"
                  : "border-line bg-white text-ink/70 hover:border-brown hover:text-ink"
              }`}
            >
              <Icon size={14} /> {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryTabs;