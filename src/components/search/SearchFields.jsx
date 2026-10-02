import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { FiCalendar, FiRepeat } from "react-icons/fi";

/* Shared hero search fields (custom calendar + custom dropdown) used on the
   Home, Flights, Packages and Visa hero sections. */

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const pad = (n) => String(n).padStart(2, "0");
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
export const todayISO = () => toISO(new Date());
const formatDate = (s) =>
  s
    ? fromISO(s).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })
    : "";

// Closes a popover when clicking outside of it or pressing Escape.
const useDismiss = (open, setOpen) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return ref;
};

const CalendarMonth = ({ year, month, value, min, rangeFrom, rangeTo, onSelect }) => {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
  const total = new Date(year, month + 1, 0).getDate();
  const today = todayISO();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  return (
    <div className="w-full">
      <p className="mb-2 text-center text-sm font-bold text-darkBlue">
        {monthNames[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-0.5 text-center">
        {weekDays.map((d, i) => (
          <span key={i} className="pb-1 text-[10px] font-semibold text-darkBlue/50">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (!day) return <span key={i} />;
          const iso = `${year}-${pad(month + 1)}-${pad(day)}`;
          const disabled = min && iso < min;
          const selected = iso === value;
          const inRange = rangeFrom && rangeTo && iso > rangeFrom && iso < rangeTo;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                selected
                  ? "bg-darkBlue text-white"
                  : inRange
                    ? "bg-dustyRose/40 text-darkBlue"
                    : iso === today
                      ? "border border-aviationBrown text-aviationBrown hover:bg-dustyRose/40"
                      : "text-darkBlue hover:bg-dustyRose/40"
              } ${disabled ? "cursor-not-allowed opacity-30 hover:bg-transparent" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Date cell: shows the chosen date and opens a compact calendar popover on click.
export const DateField = ({
  label,
  value,
  min,
  rangeFrom,
  rangeTo,
  onChange,
  align = "left",
  months = 1,
  placeholder = "Add date",
  cellClass = "",
  labelClass = "",
  valueClass = "text-sm",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, setOpen);
  const start = fromISO(value || min || todayISO());
  const [view, setView] = useState({ y: start.getFullYear(), m: start.getMonth() });

  const shift = (delta) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const next = new Date(view.y, view.m + 1, 1);

  const handleSelect = (iso) => {
    onChange(iso);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${cellClass}`}>
      <button type="button" onClick={() => setOpen(!open)} className="block w-full text-left">
        <span className={labelClass}>
          <FiCalendar size={11} />
          {label}
        </span>
        <span className={`block ${valueClass} ${value ? "font-bold text-darkBlue" : "text-darkBlue/40"}`}>
          {value ? formatDate(value) : placeholder}
        </span>
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-2 ${
            months === 2 ? "w-[min(calc(100vw-4.5rem),30rem)]" : "w-[min(calc(100vw-4.5rem),19rem)]"
          } rounded-2xl border border-dustyRose bg-white p-4 text-left shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="relative flex gap-6">
            <button
              type="button"
              onClick={() => shift(-1)}
              aria-label="Previous month"
              className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-darkBlue hover:bg-dustyRose/40"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-darkBlue hover:bg-dustyRose/40"
            >
              <ChevronRight size={16} />
            </button>

            <CalendarMonth
              year={view.y}
              month={view.m}
              value={value}
              min={min}
              rangeFrom={rangeFrom}
              rangeTo={rangeTo}
              onSelect={handleSelect}
            />
            {months === 2 && (
            <div className="hidden w-full sm:block">
              <CalendarMonth
                year={next.getFullYear()}
                month={next.getMonth()}
                value={value}
                min={min}
                rangeFrom={rangeFrom}
                rangeTo={rangeTo}
                onSelect={handleSelect}
              />
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Dropdown cell: replaces the native <select> with a themed option list.
// options: [{ value, label, hint? }]
export const SelectField = ({
  label,
  icon: Icon,
  value,
  options,
  onChange,
  cellClass = "",
  labelClass = "",
  valueClass = "text-sm",
  align = "left",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, setOpen);
  const selected = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={ref} className={`relative ${cellClass}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="block w-full text-left"
      >
        <span className={labelClass}>
          {Icon && <Icon size={11} />}
          {label}
        </span>
        <span className={`flex items-center justify-between gap-2 font-bold text-darkBlue ${valueClass}`}>
          <span className="truncate">{selected.label}</span>
          <ChevronDown
            size={15}
            className={`shrink-0 text-aviationBrown transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute top-full z-50 mt-2 max-h-72 w-full min-w-[12rem] overflow-auto rounded-xl border border-dustyRose bg-white p-1.5 text-left shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    active ? "bg-darkBlue text-white" : "text-darkBlue hover:bg-cream/60"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{opt.label}</span>
                    {opt.hint && (
                      <span className={`block text-[11px] ${active ? "text-white/70" : "text-darkBlue/50"}`}>
                        {opt.hint}
                      </span>
                    )}
                  </span>
                  {active && <Check size={15} className="shrink-0 text-white" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const classOptions = [
  { value: "ECONOMY", label: "Economy", hint: "Standard seating" },
  { value: "PREMIUM ECONOMY", label: "Premium Economy", hint: "Extra legroom and comfort" },
  { value: "BUSINESS", label: "Business", hint: "Lie-flat seats and lounge access" },
  { value: "FIRST", label: "First Class", hint: "Private suite experience" },
];

export const defaultPassengers = { adults: 1, children: 0, infants: 0 };
const MAX_PASSENGERS = 9;

const passengerRows = [
  { key: "adults", title: "Adults", hint: "12+ years" },
  { key: "children", title: "Children", hint: "2–11 years" },
  { key: "infants", title: "Infants", hint: "Under 2 years" },
];

const StepButton = ({ onClick, disabled, label, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className="flex h-8 w-8 items-center justify-center rounded-full border border-darkBlue/20 text-darkBlue transition-colors hover:border-darkBlue hover:bg-darkBlue hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-darkBlue/20 disabled:hover:bg-transparent disabled:hover:text-darkBlue"
  >
    {children}
  </button>
);

// Passenger cell: adults / children / infants steppers in a popover.
// value: { adults, children, infants }
export const PassengerField = ({
  label = "Passengers",
  icon: Icon,
  value,
  onChange,
  align = "left",
  cellClass = "",
  labelClass = "",
  valueClass = "text-sm",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, setOpen);
  const total = value.adults + value.children + value.infants;

  const update = (key, delta) => {
    const next = { ...value, [key]: value[key] + delta };
    // At least one adult, and every infant needs an adult.
    if (next.adults < 1) return;
    if (next.infants > next.adults) {
      if (key === "adults") next.infants = next.adults;
      else return;
    }
    if (next.adults + next.children + next.infants > MAX_PASSENGERS) return;
    onChange(next);
  };

  const canAdd = (key) => {
    if (total >= MAX_PASSENGERS) return false;
    if (key === "infants") return value.infants < value.adults;
    return true;
  };
  const canRemove = (key) => (key === "adults" ? value.adults > 1 : value[key] > 0);

  return (
    <div ref={ref} className={`relative ${cellClass}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="block w-full text-left"
      >
        <span className={labelClass}>
          {Icon && <Icon size={11} />}
          {label}
        </span>
        <span className={`flex items-center justify-between gap-2 font-bold text-darkBlue ${valueClass}`}>
          <span className="truncate">
            {total} Passenger{total > 1 ? "s" : ""}
          </span>
          <ChevronDown
            size={15}
            className={`shrink-0 text-aviationBrown transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-2 w-[min(calc(100vw-4.5rem),18rem)] rounded-2xl border border-dustyRose bg-white p-5 text-left shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="space-y-4">
            {passengerRows.map(({ key, title, hint }) => (
              <div key={key} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-darkBlue">{title}</p>
                  <p className="text-[11px] text-darkBlue/50">{hint}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StepButton
                    label={`Remove ${title.toLowerCase()}`}
                    disabled={!canRemove(key)}
                    onClick={() => update(key, -1)}
                  >
                    <Minus size={14} />
                  </StepButton>
                  <span className="w-4 text-center text-sm font-bold text-darkBlue">{value[key]}</span>
                  <StepButton
                    label={`Add ${title.toLowerCase()}`}
                    disabled={!canAdd(key)}
                    onClick={() => update(key, 1)}
                  >
                    <Plus size={14} />
                  </StepButton>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-darkBlue/10 pt-4">
            <p className="text-[11px] text-darkBlue/50">Maximum {MAX_PASSENGERS} passengers</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm font-bold text-aviationBrown hover:text-darkBlue"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Round swap button that sits on the right edge of the "From" cell.
export const SwapButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Swap origin and destination"
    className="absolute right-[-20px] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-aviationBrown bg-aviationBrown shadow transition-all duration-300 hover:rotate-180 hover:border-darkBlue hover:bg-darkBlue lg:flex"
  >
    <FiRepeat className="text-white" size={14} />
  </button>
);

// Shared look of the hero search row (same as the Home page hero).
export const searchLabelClass =
  "mb-0.5 flex items-center gap-1 text-[11px] font-semibold text-darkBlue/70";
export const searchInputClass =
  "w-full bg-transparent text-sm font-bold text-darkBlue outline-none placeholder:font-normal placeholder:text-darkBlue/40";
export const searchCellClass =
  "relative rounded-xl border border-dustyRose bg-white px-4 py-2.5 transition-colors duration-300 hover:bg-cream/60 focus-within:border-darkBlue";
export const searchButtonClass =
  "flex items-center justify-center gap-2 rounded-xl bg-darkBlue px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-blue hover:shadow-xl sm:col-span-2 lg:col-span-1";
