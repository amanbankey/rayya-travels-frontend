import { useState } from "react";
import { ArrowUpRight, Lock, Minus } from "lucide-react";
import { submitForm } from "../services/api";

const columns = [
  {
    title: "Journeys",
    items: ["Private Aviation & Flights", "Heritage Estates & Hotels", "Diplomatic & Bespoke Visas", "Private Island Charters"],
  },
  {
    title: "Atelier",
    items: ["Our Philosophy", "Curatorial Team", "Private Client Office", "Member Portal"],
  },
];

const legal = ["Terms of Discretion", "Privacy Architecture", "Diplomatic Inquiries"];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await submitForm("/newsletter", { email });
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <footer className="mx-auto mt-6 max-w-7xl bg-soft px-4 pb-6 pt-12 sm:px-8 lg:px-12">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-2">
            <Minus size={14} className="text-sand" />
            <span className="font-serif text-lg font-medium text-ink">Raaya Travels</span>
          </div>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">
            Curators of ultra-refined experiential voyaging. We architect bespoke itineraries, secluded private retreats,
            and transcendent global cultural access for discerning epicureans.
          </p>
          <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.2em] text-muted">Sanctuary & Heritage</p>
          <p className="mt-1 text-[11px] font-medium text-ink">Geneva • Florence • Kyoto • Marrakech</p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h4 className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">{column.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {column.items.map((item) => (
                <li key={item}>
                  <a href="#home" className="text-xs font-medium text-ink transition-colors hover:text-sand">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">Private Gazette</h4>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Receive unlisted destination monographs and seasonal restorative retreats twice annually.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 border-b border-ink/30 pb-2">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your diplomatic or private address"
              className="min-w-0 flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-muted/70"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex shrink-0 items-center gap-1 text-[9px] font-medium uppercase tracking-[0.18em] text-ink"
            >
              {status === "loading" ? "Sending" : "Subscribe"} <ArrowUpRight size={11} />
            </button>
          </form>
          {status === "success" && <p className="mt-2 text-[11px] font-medium text-badgetext">Subscription confirmed.</p>}
          {status === "error" && <p className="mt-2 text-[11px] font-medium text-red-700">Something went wrong. Try again.</p>}
          <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted">
            <Lock size={10} /> Discreet, confidential correspondence strictly honored.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 text-[10px] text-muted md:flex-row md:items-center md:justify-between">
        <p>© 2025 Raaya Travels Limited. All rights reserved. Quiet luxury travel design.</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {legal.map((item) => (
            <li key={item}>
              <a href="#home" className="transition-colors hover:text-ink">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;