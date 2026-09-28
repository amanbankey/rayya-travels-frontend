import { Check } from "lucide-react";

const CheckRow = ({ checked, onToggle, className = "", children }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={onToggle}
    className={`flex w-full items-center gap-3 text-left ${className}`}
  >
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
        checked ? "border-brown bg-brown text-white" : "border-line bg-white"
      }`}
    >
      {checked && <Check size={13} strokeWidth={3} />}
    </span>
    {children}
  </button>
);

export default CheckRow;