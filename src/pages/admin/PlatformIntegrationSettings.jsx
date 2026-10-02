import { FiSettings as PageIcon } from "react-icons/fi";
import React, { useState } from "react";
import {
  FiUploadCloud,
  FiEye,
  FiEyeOff,
  FiSave,
  FiLink,
  FiUser,
  FiKey,
  FiSmartphone,
  FiMessageCircle,
  FiMapPin,
  FiMail,
  FiClock,
  FiCreditCard,
  FiZap,
  FiCpu,
} from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";

const tabs = [
  "Core Agency & Fee Rules",
  "Payment Gateway",
  "App & Firebase",
  "Support & Ops Desk",
];

/* =========================================================
   REUSABLE FIELD COMPONENTS
   ========================================================= */

const TextField = ({ label, name, value, onChange, prefix, placeholder, type = "text" }) => (
  <div>
    <label className="block text-xs font-semibold text-navy-600 mb-1.5">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-navy-400">{prefix}</span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-navy-100 rounded-xl py-2.5 text-sm text-navy-700 focus:outline-none focus:ring-2 focus:ring-ember-100 ${
          prefix ? "pl-7 pr-3" : "px-3"
        }`}
      />
    </div>
  </div>
);

const SecretField = ({ label, name, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-xs font-semibold text-navy-600 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-navy-100 rounded-xl px-3 py-2.5 pr-10 text-sm text-navy-700 focus:outline-none focus:ring-2 focus:ring-ember-100"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400"
        >
          {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
        </button>
      </div>
    </div>
  );
};

const FileField = ({ label, fileName, onChange, hint }) => (
  <div>
    <label className="block text-xs font-semibold text-navy-600 mb-1.5">{label}</label>
    <label className="flex items-center gap-3 border border-dashed border-navy-100 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-ember-50">
      <FiUploadCloud className="text-ember-600 flex-shrink-0" size={18} />
      <span className="text-xs text-navy-500 truncate">{fileName || "Choose file — no file chosen"}</span>
      <input type="file" onChange={onChange} className="hidden" />
    </label>
    {hint && <p className="text-[10px] text-navy-400 mt-1">{hint}</p>}
  </div>
);

const ToggleField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-semibold text-navy-600 mb-2">{label}</label>
    <div className="inline-flex items-center gap-2.5">
      <span className={`text-xs font-semibold ${value === "UAT" ? "text-ember-600" : "text-navy-400"}`}>UAT</span>
      <button
        type="button"
        onClick={() => onChange(value === "UAT" ? "PROD" : "UAT")}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          value === "PROD" ? "bg-gradient-to-r from-ember-600 to-ember-400 shadow-lg shadow-ember-500/30" : "bg-navy-100"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
            value === "PROD" ? "left-5" : "left-0.5"
          }`}
        />
      </button>
      <span className={`text-xs font-semibold ${value === "PROD" ? "text-ember-600" : "text-navy-400"}`}>PROD</span>
    </div>
  </div>
);

const SectionCard = ({ icon: Icon, title, badge, children }) => (
  <div className="bg-white rounded-3xl border border-navy-100 p-4 sm:p-6 mb-4 shadow-card">
    <div className="flex items-center justify-between mb-5">
      <p className="flex items-center gap-2 text-sm sm:text-base font-bold text-navy-900">
        {Icon && <Icon className="text-ember-600" size={17} />}
        {title}
      </p>
      {badge && (
        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
          {badge}
        </span>
      )}
    </div>
    {children}
  </div>
);

const SaveButton = ({ isSaving, label = "Save Changes" }) => (
  <div className="flex justify-end">
    <button
      type="submit"
      disabled={isSaving}
      className="flex items-center gap-2 bg-ember-500 hover:brightness-110 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl disabled:opacity-60"
    >
      <FiSave size={15} />
      {isSaving ? "Saving..." : label}
    </button>
  </div>
);

const useSaveHandler = (endpoint) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async (payload, e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Save failed");
    } catch (err) {
      setError("Could not save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaving, error, save };
};

/* =========================================================
   TAB 1 — CORE AGENCY, FEE RULES & API INTEGRATIONS
   ========================================================= */

const CoreAgencyTab = () => {
  const [formData, setFormData] = useState({
    adminName: "Rayya Travels Operations",
    masterOverrideKey: "",
    flightAgencyCharge: "350",
    visaAgencyCharge: "500",
    otbBoardCharge: "0",
    childVisaPriceUAE: "6200",
    insuranceBaseUAE: "19",
    etravUrlProd: "https://prod-api.etrav.in",
    etravUrlUat: "https://stg-api.codemagen.net",
    etravUatUserName: "rayyatravels",
    etravUatPassword: "",
    etravProdUserName: "rayyatravelstourism",
    etravProdPassword: "",
    etravCharge: "300",
    etravEnable: "UAT",
    airiqUrlUat: "https://omairiq.azurewebsites.net/",
    airiqUrlProd: "https://omairiq.azurewebsites.net/",
    airiqUatUserName: "9555202202",
    airiqUatPassword: "",
    airiqProdUserName: "8949730339",
    airiqProdPassword: "",
    airiqCharge: "300",
    airiqEnable: "UAT",
    goflyCharge: "400",
    vinflyCharge: "400",
    aiToolUrl: "",
    aiToolUserName: "",
    aiToolPassword: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const { isSaving, error, save } = useSaveHandler("/api/admin/platform-settings/core-agency");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={(e) => save(formData, e)}>
      <SectionCard icon={MdOutlineAccountBalance} title="Agency Commercials & Service Markup Rules" badge="PROD ENV">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <TextField label="Admin Name" name="adminName" value={formData.adminName} onChange={handleChange} />

            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Brand Logo</label>
              <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-navy-100 rounded-2xl py-6 cursor-pointer hover:bg-ember-50">
                {logoPreview ? (
                  <img src={logoPreview} alt="Brand logo preview" className="w-12 h-12 object-contain rounded" />
                ) : (
                  <FiUploadCloud className="text-ember-600" size={22} />
                )}
                <span className="text-xs font-semibold text-ember-600">Click to upload new</span>
                <span className="text-[10px] text-navy-400">SVG, PNG, JPG Max 2MB</span>
                <input type="file" accept=".svg,.png,.jpg,.jpeg" onChange={handleLogoChange} className="hidden" />
              </label>
            </div>

            <SecretField
              label="Master Override Key"
              name="masterOverrideKey"
              value={formData.masterOverrideKey}
              onChange={handleChange}
              placeholder="••••••••••••••"
            />
          </div>

          <div className="space-y-4">
            <div className="border border-navy-100 rounded-2xl p-4">
              <p className="text-[11px] font-bold tracking-wide text-navy-500 mb-3">BASE SERVICE CHARGES</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField label="Flight Agency Charge" name="flightAgencyCharge" value={formData.flightAgencyCharge} onChange={handleChange} prefix="₹" type="number" />
                <TextField label="Visa Agency Charge" name="visaAgencyCharge" value={formData.visaAgencyCharge} onChange={handleChange} prefix="₹" type="number" />
              </div>
              <div className="mt-4">
                <TextField label="OTB 30k To Board Charge" name="otbBoardCharge" value={formData.otbBoardCharge} onChange={handleChange} prefix="₹" type="number" />
              </div>
            </div>

            <div className="border border-navy-100 rounded-2xl p-4">
              <p className="text-[11px] font-bold tracking-wide text-navy-500 mb-3">REGIONAL SPECIFIC PRICING (UAE)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField label="Child Visa Price UAE" name="childVisaPriceUAE" value={formData.childVisaPriceUAE} onChange={handleChange} prefix="₹" type="number" />
                <TextField label="Insurance Base UAE" name="insuranceBaseUAE" value={formData.insuranceBaseUAE} onChange={handleChange} prefix="₹" type="number" />
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={FiLink} title="Etrav Engine">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="Etrav URL Prod" name="etravUrlProd" value={formData.etravUrlProd} onChange={handleChange} />
          <TextField label="Etrav URL UAT" name="etravUrlUat" value={formData.etravUrlUat} onChange={handleChange} />
          <TextField label="Etrav Charge" name="etravCharge" value={formData.etravCharge} onChange={handleChange} prefix="₹" type="number" />
          <TextField label="Etrav UAT UserName" name="etravUatUserName" value={formData.etravUatUserName} onChange={handleChange} />
          <SecretField label="Etrav UAT Password" name="etravUatPassword" value={formData.etravUatPassword} onChange={handleChange} />
          <TextField label="Etrav PROD UserName" name="etravProdUserName" value={formData.etravProdUserName} onChange={handleChange} />
          <SecretField label="Etrav PROD Password" name="etravProdPassword" value={formData.etravProdPassword} onChange={handleChange} />
        </div>
        <div className="mt-5 pt-4 border-t border-navy-50">
          <ToggleField label="Etrav Enable" value={formData.etravEnable} onChange={(v) => setFormData((p) => ({ ...p, etravEnable: v }))} />
        </div>
      </SectionCard>

      <SectionCard icon={FiZap} title="AirIQ Engine">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="AirIQ URL UAT" name="airiqUrlUat" value={formData.airiqUrlUat} onChange={handleChange} />
          <TextField label="AirIQ URL Prod" name="airiqUrlProd" value={formData.airiqUrlProd} onChange={handleChange} />
          <TextField label="Air_iq Charge" name="airiqCharge" value={formData.airiqCharge} onChange={handleChange} prefix="₹" type="number" />
          <TextField label="AirIQ UAT UserName" name="airiqUatUserName" value={formData.airiqUatUserName} onChange={handleChange} />
          <SecretField label="AirIQ UAT Password" name="airiqUatPassword" value={formData.airiqUatPassword} onChange={handleChange} />
          <TextField label="AirIQ PROD UserName" name="airiqProdUserName" value={formData.airiqProdUserName} onChange={handleChange} />
          <SecretField label="AirIQ PROD Password" name="airiqProdPassword" value={formData.airiqProdPassword} onChange={handleChange} />
        </div>
        <div className="mt-5 pt-4 border-t border-navy-50">
          <ToggleField label="AirIQ Enable" value={formData.airiqEnable} onChange={(v) => setFormData((p) => ({ ...p, airiqEnable: v }))} />
        </div>
      </SectionCard>

      <SectionCard icon={FiCpu} title="Other Flight Engines">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Gofly Charge" name="goflyCharge" value={formData.goflyCharge} onChange={handleChange} prefix="₹" type="number" />
          <TextField label="Vinfly Charge" name="vinflyCharge" value={formData.vinflyCharge} onChange={handleChange} prefix="₹" type="number" />
        </div>
      </SectionCard>

      <SectionCard icon={FiCpu} title="AI Tool">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="AI Tool URL" name="aiToolUrl" value={formData.aiToolUrl} onChange={handleChange} placeholder="https://" />
          <TextField label="AI Tool UserName" name="aiToolUserName" value={formData.aiToolUserName} onChange={handleChange} />
          <SecretField label="AI Tool Password" name="aiToolPassword" value={formData.aiToolPassword} onChange={handleChange} />
        </div>
      </SectionCard>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-navy-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          All Engine Gateways Connected (Latency: 42ms)
          {error && <span className="text-red-500 ml-3">{error}</span>}
        </div>
        <SaveButton isSaving={isSaving} label="Update & Deploy Settings" />
      </div>
    </form>
  );
};

/* =========================================================
   TAB 3 — PAYMENT GATEWAY
   ========================================================= */

const PaymentGatewayTab = () => {
  const [formData, setFormData] = useState({
    razorpayKeyTest: "rzp_test_Cdw8jmV9I9R9vG",
    razorpayKeyProd: "rzp_live_sYbcyWNMUmSsFz",
    razorpayEnable: "UAT",
  });
  const { isSaving, error, save } = useSaveHandler("/api/admin/platform-settings/payment-gateway");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => save(formData, e)}>
      <SectionCard icon={FiCreditCard} title="Razorpay Configuration">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SecretField label="Razorpay Key Test" name="razorpayKeyTest" value={formData.razorpayKeyTest} onChange={handleChange} />
          <SecretField label="Razorpay Key Prod" name="razorpayKeyProd" value={formData.razorpayKeyProd} onChange={handleChange} />
        </div>
        <div className="mt-5 pt-4 border-t border-navy-50">
          <ToggleField label="Razorpay Enable" value={formData.razorpayEnable} onChange={(v) => setFormData((p) => ({ ...p, razorpayEnable: v }))} />
        </div>
      </SectionCard>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
      <SaveButton isSaving={isSaving} label="Update Payment Settings" />
    </form>
  );
};

/* =========================================================
   TAB 4 — APP & FIREBASE
   ========================================================= */

const AppFirebaseTab = () => {
  const [formData, setFormData] = useState({
    appName: "Rayya Travels",
    appVersion: "1.0",
  });
  const [appLogoName, setAppLogoName] = useState("");
  const [firebaseFileName, setFirebaseFileName] = useState("");
  const { isSaving, error, save } = useSaveHandler("/api/admin/platform-settings/app-firebase");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => save(formData, e)}>
      <SectionCard icon={FiSmartphone} title="App Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="App Name" name="appName" value={formData.appName} onChange={handleChange} />
          <FileField
            label="App Logo"
            fileName={appLogoName}
            onChange={(e) => setAppLogoName(e.target.files?.[0]?.name || "")}
            hint="SVG, PNG, JPG Max 2MB"
          />
          <TextField label="App Version" name="appVersion" value={formData.appVersion} onChange={handleChange} />
        </div>
        <div className="mt-4">
          <FileField
            label="Firebase Config"
            fileName={firebaseFileName}
            onChange={(e) => setFirebaseFileName(e.target.files?.[0]?.name || "")}
            hint="google-services.json"
          />
        </div>
      </SectionCard>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
      <SaveButton isSaving={isSaving} label="Update App Settings" />
    </form>
  );
};

/* =========================================================
   TAB 5 — SUPPORT & OPS DESK
   ========================================================= */

const SupportOpsTab = () => {
  const [formData, setFormData] = useState({
    supportMobile: "+91 8764232996",
    whatsappSupport: "+918764232996",
    address: "Rayya Tour & Travel",
    supportEmail: "mail@rayyatravels.com",
    supportStartTime: "13:53",
    supportEndTime: "13:59",
  });
  const { isSaving, error, save } = useSaveHandler("/api/admin/platform-settings/support-ops");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => save(formData, e)}>
      <SectionCard icon={FiMessageCircle} title="Support Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="Support Mobile No" name="supportMobile" value={formData.supportMobile} onChange={handleChange} />
          <TextField label="WhatsApp Support No" name="whatsappSupport" value={formData.whatsappSupport} onChange={handleChange} />
          <TextField label="Address" name="address" value={formData.address} onChange={handleChange} />
          <TextField label="Support Email" name="supportEmail" value={formData.supportEmail} onChange={handleChange} type="email" />
          <TextField label="Support Start Time" name="supportStartTime" value={formData.supportStartTime} onChange={handleChange} type="time" />
          <TextField label="Support End Time" name="supportEndTime" value={formData.supportEndTime} onChange={handleChange} type="time" />
        </div>
      </SectionCard>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
      <SaveButton isSaving={isSaving} label="Update Support Settings" />
    </form>
  );
};

/* =========================================================
   MAIN PAGE
   ========================================================= */

const PlatformIntegrationSettings = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <main className="flex-1 min-w-0 min-h-screen bg-[#EEF3F7] overflow-y-auto">
      <div className="p-4 sm:p-6 lg:pl-2">
        <div className="mb-6">
          <div className="flex items-center gap-4"><span className="w-14 h-14 rounded-2xl bg-ember-500 text-white flex items-center justify-center  flex-shrink-0"><PageIcon size={24} /></span><div><h1 className="text-3xl font-extrabold text-navy-900 leading-tight">Platform & Integration Settings</h1><p className="text-navy-400 mt-0.5">Manage global agency fees, third-party flight engine APIs, payment gateways, mobile app
            parameters, and support channels.</p></div></div>
        </div>

        <div className="flex items-center gap-6 border-b border-navy-100 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors
              ${activeTab === tab ? "text-ember-600 border-blue-600" : "text-navy-400 border-transparent hover:text-navy-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Core Agency & Fee Rules" && <CoreAgencyTab />}
        {activeTab === "Payment Gateway" && <PaymentGatewayTab />}
        {activeTab === "App & Firebase" && <AppFirebaseTab />}
        {activeTab === "Support & Ops Desk" && <SupportOpsTab />}
      </div>
    </main>
  );
};

export default PlatformIntegrationSettings;