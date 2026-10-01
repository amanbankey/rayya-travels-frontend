import React, { useState } from "react";
import {
  X,
  ChevronRight,
 
} from "lucide-react";
export const Breadcrumb = ({ items, badge }) => (
  <div className="flex items-center gap-2 text-sm">
    {items.map((item, idx) => (
      <React.Fragment key={item}>
        {idx > 0 && <ChevronRight size={13} className="text-gray-300" />}
        <span className={idx === items.length - 1 ? "text-gray-900 font-semibold" : "text-gray-400"}>{item}</span>
      </React.Fragment>
    ))}
    {badge && (
      <span className="ml-2 bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full">{badge}</span>
    )}
  </div>
);