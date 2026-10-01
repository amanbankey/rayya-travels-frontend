import React from "react";
import { X, Edit2, Plane, Wallet, FileText, Image as ImageIcon, CreditCard, Ticket, BedDouble } from "lucide-react";

const visaSpec = {
  status: "ACTIVE",
  route: "IND ⇄ UAE",
  title: "Dubai Visa 30 Days Single Entry",
  origin: "IND",
  destination: "UAE",
  entryType: "Single",
  validity: "60 Days",
  duration: "30 Days",
  sla: "2-5 Days",
  adultFee: "₹7,150",
  childFee: "₹1,300",
  securityDeposit: "4,000 AED",
  documents: [
    { icon: FileText, title: "Passport", sub: "Clear scan of front and back pages" },
    { icon: ImageIcon, title: "Photo", sub: "Recent passport size, white background" },
    { icon: CreditCard, title: "PAN Card", sub: "For Indian citizens" },
    { icon: Ticket, title: "Return Ticket", sub: "Confirmed onward/return journey" },
    { icon: BedDouble, title: "Hotel Voucher", sub: "Confirmed accommodation details" },
  ],
};

const VisaProductSpecificationDrawer = ({ spec = visaSpec, onClose, onEdit }) => (
  <div className="fixed inset-0 z-50 flex justify-end">
    <div onClick={onClose} className="absolute inset-0 bg-black/40" />
    <div className="relative w-full sm:w-[480px] lg:w-[540px] h-full bg-stone-50 shadow-2xl flex flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-3 bg-white px-5 py-4 border-b border-stone-200">
        <div>
          <span className="bg-ember-50 text-ember-600 text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full">
            {spec.status}
          </span>
          <h2 className="text-lg font-bold text-navy-900 mt-1.5">Visa Product Specification</h2>
          <p className="text-sm text-stone-500 mt-0.5">
            <span className="text-ember-600 font-semibold">{spec.route}</span>{" "}
            <span className="mx-1 text-stone-300">|</span> {spec.title}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 border border-stone-200 text-ember-600 text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <Edit2 size={13} /> Edit Parameters
          </button>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-stone-500 bg-stone-50 px-4 py-2.5 border-b border-stone-100">
            <Plane size={13} /> ROUTE & ENTRY SPECIFICATIONS
          </p>
          <div className="grid grid-cols-3 gap-4 px-4 py-4">
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">ORIGIN</p>
              <p className="text-sm font-medium text-navy-800">{spec.origin}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">DESTINATION</p>
              <p className="text-sm font-medium text-navy-800">{spec.destination}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">ENTRY TYPE</p>
              <p className="text-sm font-medium text-navy-800">{spec.entryType}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">VALIDITY</p>
              <p className="text-sm font-medium text-navy-800">{spec.validity}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">DURATION</p>
              <p className="text-sm font-medium text-navy-800">{spec.duration}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">SLA</p>
              <p className="text-sm font-medium text-navy-800">{spec.sla}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-stone-500 bg-stone-50 px-4 py-2.5 border-b border-stone-100">
            <Wallet size={13} /> COMMERCIAL BASELINE & SECURITY
          </p>
          <div className="grid grid-cols-3 gap-4 px-4 py-4">
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">ADULT FEE</p>
              <p className="text-base font-bold text-navy-900">{spec.adultFee}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">CHILD FEE</p>
              <p className="text-base font-bold text-navy-900">{spec.childFee}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 mb-1">SECURITY DEPOSIT</p>
              <p className="text-base font-bold text-navy-900">{spec.securityDeposit}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-stone-500 bg-stone-50 px-4 py-2.5 border-b border-stone-100">
            <FileText size={13} /> REQUIRED DOCUMENTS CHECKLIST
          </p>
          <div className="flex flex-col divide-y divide-stone-50">
            {spec.documents.map((doc) => (
              <div key={doc.title} className="flex items-center gap-3 px-4 py-3">
                <span className="w-8 h-8 rounded-xl bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0">
                  <doc.icon size={15} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-800">{doc.title}</p>
                  <p className="text-xs text-stone-400">{doc.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default VisaProductSpecificationDrawer;