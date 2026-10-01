import React, { useState } from "react";
import { X, Plane, FileText, Plus, Save } from "lucide-react";

const defaultVisaRules = {
  origin: "United Arab Emirates (AE)",
  destination: "Saudi Arabia (SA)",
  productTitle: "30 Days Tourist Visa - KSA",
  description: "Standard tourist e-visa valid for 30 days from entry. Requires valid passport and standard health insurance.",
  classification: "Single Entry",
  validityDays: 90,
  durationDays: 30,
  documents: ["Passport Front Page", "Recent Photograph"],
  ultraCardEnabled: true,
  adultBase: 350,
  childBase: 250,
  abscondingSecurity: 1500,
  active: true,
};

const UpdateVisaProductRulesDrawer = ({ rules = defaultVisaRules, onClose, onSave }) => {
  const [form, setForm] = useState(rules);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const removeDocument = (doc) => update("documents", form.documents.filter((d) => d !== doc));

  const adultTotal = Number(form.adultBase) + Number(form.abscondingSecurity);
  const childTotal = Number(form.childBase) + Number(form.abscondingSecurity);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative w-full sm:w-[480px] lg:w-[560px] h-full bg-white shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-stone-100">
          <div>
            <p className="text-[10px] font-bold tracking-wide text-stone-400">PRODUCT CONFIGURATION</p>
            <h2 className="text-lg font-bold text-navy-900 mt-0.5">Update Visa Product Rules</h2>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
          <div className="border border-stone-200 rounded-2xl p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
              <Plane size={15} className="text-stone-500" /> Route Configuration
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Origin</label>
                <select
                  value={form.origin}
                  onChange={(e) => update("origin", e.target.value)}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-navy-800 outline-none"
                >
                  <option>{form.origin}</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Destination</label>
                <select
                  value={form.destination}
                  onChange={(e) => update("destination", e.target.value)}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-navy-800 outline-none"
                >
                  <option>{form.destination}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border border-stone-200 rounded-2xl p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
              <FileText size={15} className="text-stone-500" /> Product Details
            </p>
            <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Product Title</label>
            <input
              value={form.productTitle}
              onChange={(e) => update("productTitle", e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-navy-800 outline-none mb-3"
            />
            <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Detailed Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-navy-800 outline-none resize-none"
            />
          </div>

          <div className="border border-stone-200 rounded-2xl p-4">
            <p className="text-sm font-bold text-navy-900 mb-3">Entry & Duration</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Classification</label>
                <select
                  value={form.classification}
                  onChange={(e) => update("classification", e.target.value)}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-navy-800 outline-none"
                >
                  <option>Single Entry</option>
                  <option>Multiple Entry</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Validity (Days)</label>
                <input
                  type="number"
                  value={form.validityDays}
                  onChange={(e) => update("validityDays", Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-navy-800 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Duration (Days)</label>
                <input
                  type="number"
                  value={form.durationDays}
                  onChange={(e) => update("durationDays", Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-navy-800 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="border border-stone-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-navy-900">Required Documents</p>
              <button className="flex items-center gap-1 text-ember-600 text-xs font-semibold">
                <Plus size={13} /> Add Document
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.documents.map((doc) => (
                <span
                  key={doc}
                  className="flex items-center gap-1.5 border border-stone-200 text-stone-700 text-xs px-2.5 py-1.5 rounded-xl"
                >
                  {doc}
                  <button onClick={() => removeDocument(doc)} className="text-stone-400 hover:text-stone-600">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="border border-stone-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-navy-900">Commercial Configuration</p>
              {form.ultraCardEnabled && (
                <span className="bg-ember-50 text-ember-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  UltraCard Enabled
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Adult Base (AED)</label>
                <div className="flex items-center border border-stone-200 rounded-xl px-3">
                  <span className="text-stone-400 text-xs mr-1">AED</span>
                  <input
                    type="number"
                    value={form.adultBase}
                    onChange={(e) => update("adultBase", Number(e.target.value))}
                    className="w-full py-2.5 text-sm text-navy-800 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Child Base (AED)</label>
                <div className="flex items-center border border-stone-200 rounded-xl px-3">
                  <span className="text-stone-400 text-xs mr-1">AED</span>
                  <input
                    type="number"
                    value={form.childBase}
                    onChange={(e) => update("childBase", Number(e.target.value))}
                    className="w-full py-2.5 text-sm text-navy-800 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Absconding Security</label>
                <div className="flex items-center border border-stone-200 rounded-xl px-3">
                  <span className="text-stone-400 text-xs mr-1">AED</span>
                  <input
                    type="number"
                    value={form.abscondingSecurity}
                    onChange={(e) => update("abscondingSecurity", Number(e.target.value))}
                    className="w-full py-2.5 text-sm text-navy-800 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-ember-600">
                LIVE PREVIEW <span className="text-stone-400 font-normal">Standard Issuance Totals</span>
              </p>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] text-stone-400">Adult Total</p>
                  <p className="text-sm font-bold text-navy-900">AED {adultTotal.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-stone-400">Child Total</p>
                  <p className="text-sm font-bold text-navy-900">AED {childTotal.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-stone-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-navy-900">Product Status</p>
              <p className="text-xs text-stone-400 mt-0.5">Determine if this visa product is visible and available for applications.</p>
            </div>
            <button
              onClick={() => update("active", !form.active)}
              className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors flex-shrink-0 ${
                form.active ? "bg-ember-600 justify-end" : "bg-stone-300 justify-start"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-stone-100">
          <button onClick={onClose} className="text-sm font-semibold text-stone-600 px-4 py-2.5 rounded-xl border border-stone-200">
            Discard Changes
          </button>
          <button
            onClick={() => onSave && onSave(form)}
            className="flex items-center gap-2 bg-ember-600 hover:bg-ember-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
          >
            <Save size={15} /> Update & Publish Visa Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVisaProductRulesDrawer;