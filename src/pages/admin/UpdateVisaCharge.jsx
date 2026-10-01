import React, { useState } from "react";
import { X, Save, Info } from "lucide-react";

const defaultVisaCharge = {
  agentName: "Rayya Travels",
  applicationRef: "VIS-8921",
  retailPrice: 7150,
  agentPriceAdult: 6880,
  childCharge: 1300,
  otbCharge: 0,
  otbApplicable: false,
};

const UpdateVisaChargesModal = ({ charge = defaultVisaCharge, onClose, onSave }) => {
  const [adultCharge, setAdultCharge] = useState(charge.agentPriceAdult);
  const [childCharge, setChildCharge] = useState(charge.childCharge);
  const [otbCharge, setOtbCharge] = useState(charge.otbCharge);

  const margin = adultCharge - charge.retailPrice;
  const isBelowRetail = margin < 0;

  const handleSave = () => {
    if (onSave) onSave({ adultCharge, childCharge, otbCharge });
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Update Visa Charges</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {charge.agentName} <span className="mx-1">•</span> Application #{charge.applicationRef}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 px-6 py-6">
          <div className="sm:col-span-3 flex flex-col gap-4">
            <p className="text-sm font-bold text-gray-900">Editable Pricing</p>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Agent Visa Charge (Adult)</label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
                <span className="text-gray-400 text-sm mr-1">₹</span>
                <input
                  type="number"
                  value={adultCharge}
                  onChange={(e) => setAdultCharge(Number(e.target.value))}
                  className="w-full py-2.5 text-sm text-gray-800 outline-none"
                />
              </div>
              <p className={`text-xs font-medium mt-1 ${isBelowRetail ? "text-red-500" : "text-emerald-600"}`}>
                {isBelowRetail ? "↓" : "↑"} Margin: {isBelowRetail ? "-" : "+"}₹{Math.abs(margin).toLocaleString()}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Child Charge</label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
                <span className="text-gray-400 text-sm mr-1">₹</span>
                <input
                  type="number"
                  value={childCharge}
                  onChange={(e) => setChildCharge(Number(e.target.value))}
                  className="w-full py-2.5 text-sm text-gray-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">OTB Charge</label>
              <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg px-3">
                <span className="text-gray-400 text-sm mr-1">₹</span>
                <input
                  type="number"
                  value={otbCharge}
                  disabled={!charge.otbApplicable}
                  onChange={(e) => setOtbCharge(Number(e.target.value))}
                  className="w-full py-2.5 text-sm text-gray-500 outline-none bg-transparent disabled:cursor-not-allowed"
                />
              </div>
              {!charge.otbApplicable && (
                <p className="text-xs text-gray-400 mt-1">Not applicable for this visa type.</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sticky top-0">
              <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-3">Live Price Preview</p>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Retail Price</span>
                <span className="text-sm font-semibold text-gray-800">₹{charge.retailPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-500">Agent Price</span>
                <span className="text-sm font-bold text-blue-600">₹{adultCharge.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-sm text-gray-500">Difference</span>
                <span className={`text-sm font-bold ${isBelowRetail ? "text-red-500" : "text-emerald-600"}`}>
                  {isBelowRetail ? "-" : "+"}₹{Math.abs(margin).toLocaleString()}
                </span>
              </div>

              {isBelowRetail && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 mt-4">
                  <Info className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                  <p className="text-xs text-red-600 leading-snug">
                    Pricing is below standard retail margin. Proceed with caution.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} className="text-sm font-semibold text-gray-600 px-4 py-2.5 rounded-lg border border-gray-200">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            <Save size={15} /> Update & Save Pricing
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVisaChargesModal;