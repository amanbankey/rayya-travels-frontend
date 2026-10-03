import { useState } from "react";
import {
  ChevronRight,
  Check,
  UploadCloud,
  Shield,
  FileText,
  CreditCard,
  Camera,
  Building2,
  User,
  Globe,
  Users,
  Calendar,
  Heart,
  MapPin,
  Plane,
  LogIn,
  LogOut,
  Briefcase,
  UserPlus,
  Trash2,
  Clock,
  Ban,
  Lock,
  Wallet,
  ArrowRight,
  Cloud
} from "lucide-react";

const emptyTravelerData = {
  firstName: "",
  lastName: "",
  nationality: "",
  passengerType: "Adult",
  sex: "",
  dob: "",
  passportNumber: "",
  placeOfBirth: "",
  motherName: "",
  fatherName: "",
  spouseName: "",
  travelDate: "2026-10-08",
  checkIn: "",
  checkOut: ""
};

const emptyTravelerFiles = {
  travelerPhoto: null,
  passportFront: null,
  passportBack: null,
  panCard: null,
  hotelVoucher: null,
  additionalDocument: null
};

const emptyTravelerProfessional = {
  panNumber: "",
  occupation: ""
};

function createTraveler(id) {
  return {
    id,
    data: { ...emptyTravelerData, ...emptyTravelerProfessional },
    files: { ...emptyTravelerFiles }
  };
}

const uploadFields = [
  { key: "travelerPhoto", label: "Traveler's Photo", icon: Camera, required: true, note: null },
  { key: "passportFront", label: "Passport Front", icon: FileText, required: true, note: "Auto-fills passport details" },
  { key: "passportBack", label: "Passport Back", icon: FileText, required: true, note: null },
  { key: "panCard", label: "Traveler's PAN Card", icon: CreditCard, required: true, note: "Auto-fills PAN number" },
  { key: "hotelVoucher", label: "Hotel Voucher", icon: Building2, required: false, note: null },
  { key: "additionalDocument", label: "Additional Document", icon: FileText, required: false, note: null }
];

const steps = [
  { label: "Visa", status: "done" },
  { label: "Travelers", status: "active" },
  { label: "Payment", status: "pending" }
];

const visaFee = 7150;

function FlightRoute({ from, to }) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-darkBlue">
      <span className="shrink-0">{from}</span>
      <div className="relative flex-1 h-5 overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />
        <Cloud size={10} className="absolute top-1 text-gray-300 animate-drift" style={{ animationDelay: "0s" }} />
        <Cloud size={8} className="absolute top-2.5 text-gray-200 animate-drift" style={{ animationDelay: "2s" }} />
        <Plane
          size={16}
          className="absolute top-1/2 -translate-y-1/2 text-brown rotate-90 animate-fly"
        />
      </div>
      <span className="shrink-0 text-right">{to}</span>
    </div>
  );
}

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-brown" />
      </span>
      <div>
        <h3 className="font-semibold text-darkBlue">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
}

function TextField({ label, name, value, onChange, placeholder, icon: Icon, required, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-darkBlue mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 border border-gray-300 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, icon: Icon, required, placeholder, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-darkBlue mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown text-gray-600`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function TravelerCard({ traveler, index, canDelete, onFieldChange, onFileChange, onDelete }) {
  const { id, data, files } = traveler;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 animate-fade-in-up transition-shadow duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between gap-3 mb-5 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center text-brown font-semibold text-sm shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h2 className="font-semibold text-darkBlue">Traveler {index + 1}</h2>
            <p className="text-sm text-gray-500">Passenger information</p>
          </div>
        </div>
        {canDelete && (
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="flex items-center gap-1.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center shrink-0">
              <UploadCloud size={20} className="text-brown" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-darkBlue">Smart document autofill</h3>
                <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  Saves time
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Upload your documents first and we'll automatically fill the details that can be read from them.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-brown mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-darkBlue text-sm">Passport Front</p>
                  <p className="text-xs text-gray-500">
                    Automatically fills name, passport number, nationality, gender, date of birth and place of
                    birth.
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400 shrink-0">Step 1</span>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <CreditCard size={18} className="text-brown mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-darkBlue text-sm">PAN Card</p>
                  <p className="text-xs text-gray-500">Automatically reads your PAN number from the uploaded card.</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 shrink-0">Step 2</span>
            </div>
          </div>

        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading
            icon={FileText}
            title="Upload your documents"
            description="Start with your Passport Front and PAN Card. We'll automatically fill the information we can read from these documents."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadFields.map((field) => {
              const Icon = field.icon;
              const file = files[field.key];
              const inputId = `upload-${id}-${field.key}`;
              return (
                <div
                  key={field.key}
                  className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-200 hover:border-brown/50 hover:bg-brown/5"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-brown" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-darkBlue text-sm">
                        {field.label}
                        {field.required && <span className="text-red-500"> *</span>}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {file ? file.name : "Click to upload a document"}
                      </p>
                      {field.note && <p className="text-xs text-brown mt-0.5">+ {field.note}</p>}
                    </div>
                  </div>
                  <label
                    htmlFor={inputId}
                    className="text-sm font-medium border border-gray-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 text-darkBlue shrink-0"
                  >
                    Browse
                  </label>
                  <input
                    id={inputId}
                    type="file"
                    className="hidden"
                    onChange={(e) => onFileChange(id, field.key, e.target.files[0])}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading
            icon={User}
            title="Personal details"
            description="Review the information filled from your passport and complete anything that is still missing."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField label="First Name" name="firstName" value={data.firstName} onChange={(e) => onFieldChange(id, e)} placeholder="Enter first name" icon={User} required />
            <TextField label="Last Name" name="lastName" value={data.lastName} onChange={(e) => onFieldChange(id, e)} placeholder="Enter last name" icon={User} required />
            <SelectField label="Nationality" name="nationality" value={data.nationality} onChange={(e) => onFieldChange(id, e)} icon={Globe} required placeholder="Select nationality" options={["Indian", "American", "British"]} />
            <SelectField label="Passenger Type" name="passengerType" value={data.passengerType} onChange={(e) => onFieldChange(id, e)} icon={Users} required options={["Adult", "Child", "Infant"]} />
            <SelectField label="Sex" name="sex" value={data.sex} onChange={(e) => onFieldChange(id, e)} icon={Users} required placeholder="Select gender" options={["Male", "Female", "Other"]} />
            <TextField label="Date of Birth" name="dob" value={data.dob} onChange={(e) => onFieldChange(id, e)} icon={Calendar} required type="date" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading icon={FileText} title="Passport information" description="Review the passport number read from your uploaded passport." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField label="Passport Number" name="passportNumber" value={data.passportNumber} onChange={(e) => onFieldChange(id, e)} placeholder="A1234567" icon={FileText} required />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading icon={Heart} title="Family & background" description="Some of these details may not be available on the passport and need to be entered manually." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField label="Place of Birth" name="placeOfBirth" value={data.placeOfBirth} onChange={(e) => onFieldChange(id, e)} placeholder="Enter place of birth" icon={MapPin} />
            <TextField label="Mother's Name" name="motherName" value={data.motherName} onChange={(e) => onFieldChange(id, e)} placeholder="Enter mother's name" icon={User} />
            <TextField label="Father's Name" name="fatherName" value={data.fatherName} onChange={(e) => onFieldChange(id, e)} placeholder="Enter father's name" icon={User} required />
            <TextField label="Spouse's Name" name="spouseName" value={data.spouseName} onChange={(e) => onFieldChange(id, e)} placeholder="Enter spouse's name" icon={User} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading icon={Plane} title="Travel details" description="Add the travel information required for your application." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField label="Travel Date" name="travelDate" value={data.travelDate} onChange={(e) => onFieldChange(id, e)} icon={Calendar} required type="date" />
            <TextField label="Check-in Point" name="checkIn" value={data.checkIn} onChange={(e) => onFieldChange(id, e)} placeholder="Enter check-in point" icon={LogIn} required />
            <TextField label="Check-out Point" name="checkOut" value={data.checkOut} onChange={(e) => onFieldChange(id, e)} placeholder="Enter check-out point" icon={LogOut} required />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading icon={Briefcase} title="Professional information" description="PAN number can be filled automatically from the uploaded PAN card. Occupation needs to be selected manually." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField label="India PAN Card Number" name="panNumber" value={data.panNumber} onChange={(e) => onFieldChange(id, e)} placeholder="ABCDE1234F" icon={CreditCard} required />
            <SelectField label="Occupation" name="occupation" value={data.occupation} onChange={(e) => onFieldChange(id, e)} icon={Briefcase} placeholder="Select occupation" options={["Employed", "Self-employed", "Student", "Retired"]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TravelerDetails() {
  const [travelers, setTravelers] = useState([createTraveler(1)]);
  const [nextId, setNextId] = useState(2);
  const [contact, setContact] = useState({ email: "", mobile: "", paymentMethod: "Online" });
  const [travelInsurance, setTravelInsurance] = useState(false);

  const handleTravelerFieldChange = (id, e) => {
    const { name, value } = e.target;
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id ? { ...traveler, data: { ...traveler.data, [name]: value } } : traveler
      )
    );
  };

  const handleTravelerFileChange = (id, field, file) => {
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id ? { ...traveler, files: { ...traveler.files, [field]: file } } : traveler
      )
    );
  };

  const handleAddTraveler = () => {
    setTravelers((prev) => [...prev, createTraveler(nextId)]);
    setNextId((prev) => prev + 1);
  };

  const handleDeleteTraveler = (id) => {
    setTravelers((prev) => prev.filter((traveler) => traveler.id !== id));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethod = (method) => {
    setContact((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("email", contact.email);
    payload.append("mobile", contact.mobile);
    payload.append("paymentMethod", contact.paymentMethod);
    payload.append("travelInsurance", travelInsurance);

    travelers.forEach((traveler, index) => {
      Object.entries(traveler.data).forEach(([key, value]) => {
        payload.append(`travelers[${index}][${key}]`, value);
      });
      Object.entries(traveler.files).forEach(([key, value]) => {
        if (value) payload.append(`travelers[${index}][${key}]`, value);
      });
    });

    try {
      const response = await fetch("/api/visa-application", {
        method: "POST",
        body: payload
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPayable = visaFee * travelers.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm mb-5 animate-fade-in-up">
          <span className="text-brown font-medium">Visa Application</span>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-500">Traveler Details</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-darkBlue mb-2">Tell us about your travelers</h1>
            <p className="text-sm text-gray-500 max-w-xl">
              Upload your documents first. We'll automatically fill the information we can read, and you can review
              or complete the remaining details.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 w-full sm:w-72">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Application progress</span>
              <span className="text-sm font-semibold text-brown">Step 2 of 3</span>
            </div>
            <div className="flex items-center">
              {steps.map((step, index) => (
                <div key={step.label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step.status === "done"
                          ? "bg-brown/10 text-brown"
                          : step.status === "active"
                          ? "bg-brown text-white animate-pulse-brown"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step.status === "done" ? <Check size={16} /> : index + 1}
                    </div>
                    <span
                      className={`text-xs ${step.status === "active" ? "text-brown font-medium" : "text-gray-400"}`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-2 ${step.status === "done" ? "bg-brown/40" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          <div className="order-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden lg:sticky lg:top-6 transition-shadow duration-300 hover:shadow-lg">
              <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-gray-100">
                <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center">
                  <CreditCard size={20} className="text-brown" />
                </span>
                <div>
                  <h3 className="font-semibold text-darkBlue">Price Summary</h3>
                  <p className="text-xs text-gray-500">
                    {travelers.length} traveler{travelers.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <p className="text-xs text-gray-400 tracking-wide mb-2">TRAVEL ROUTE</p>
                <FlightRoute from="India" to="United Arab Emirates" />
              </div>

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Visa fee x {travelers.length}</span>
                  <span className="font-medium text-darkBlue">₹{totalPayable.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-sm">Total payable</span>
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    Secure
                  </span>
                </div>
                <p className="text-2xl font-bold text-darkBlue">₹{totalPayable.toLocaleString("en-IN")}</p>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <h4 className="font-medium text-darkBlue text-sm">Payment contact details</h4>
                  <p className="text-xs text-gray-500">Your mobile number is required to continue with the payment.</p>
                </div>

                <TextField label="Email" name="email" value={contact.email} onChange={handleContactChange} placeholder="Enter your email" />
                <div>
                  <TextField label="Mobile Number" name="mobile" value={contact.mobile} onChange={handleContactChange} placeholder="Enter 10-digit mobile number" required />
                  <p className="text-xs text-gray-400 mt-1">This number will be used for your payment transaction.</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-darkBlue mb-2">Payment method</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethod("Online")}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 active:scale-95 ${
                        contact.paymentMethod === "Online" ? "border-brown text-brown bg-brown/5" : "border-gray-300 text-darkBlue hover:border-brown/40"
                      }`}
                    >
                      <Plane size={16} /> Online
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePaymentMethod("Wallet")}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 active:scale-95 ${
                        contact.paymentMethod === "Wallet" ? "border-brown text-brown bg-brown/5" : "border-gray-300 text-darkBlue hover:border-brown/40"
                      }`}
                    >
                      <Wallet size={16} /> Wallet
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="glow-btn group w-full bg-darkBlue hover:bg-darkBlue/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  Continue to payment
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <Lock size={12} /> Your information is securely handled
                </p>
              </div>
            </div>
          </div>

          <div className="order-2 space-y-6">
            <div className="bg-brown/5 border border-brown/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <Shield size={20} className="text-brown mt-0.5 shrink-0" />
              <div>
                <h2 className="font-semibold text-darkBlue">Application requirements for United Arab Emirates</h2>
                <p className="text-sm text-gray-600">
                  The fields and documents below are displayed according to the requirements configured for this
                  visa.
                </p>
              </div>
            </div>

            {travelers.map((traveler, index) => (
              <TravelerCard
                key={traveler.id}
                traveler={traveler}
                index={index}
                canDelete={travelers.length > 1}
                onFieldChange={handleTravelerFieldChange}
                onFileChange={handleTravelerFileChange}
                onDelete={handleDeleteTraveler}
              />
            ))}

            <button
              type="button"
              onClick={handleAddTraveler}
              className="group w-full border border-dashed border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-2 text-sm font-medium text-darkBlue hover:border-brown hover:text-brown transition-all duration-300 hover:shadow-md active:scale-[0.98]"
            >
              <UserPlus size={18} className="transition-transform duration-300 group-hover:rotate-90" />
              Add another traveler
            </button>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 transition-shadow duration-300 hover:shadow-lg animate-fade-in-up">
              <SectionHeading icon={FileText} title="Visa information" description="Dubai Visa 60 Days Single Entry" />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Entry</p>
                  <p className="text-sm font-semibold text-darkBlue">Single Entry</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-semibold text-darkBlue">30 Days</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Processing</p>
                  <p className="text-sm font-semibold text-darkBlue">2-5 Business Days</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Route</p>
                  <FlightRoute from="India" to="UAE" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pb-5 mb-5 border-b border-gray-100">
                <div className="flex items-center gap-2 flex-1">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Travel date</p>
                    <p className="text-sm font-medium text-darkBlue">08 Oct 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Return date</p>
                    <p className="text-sm font-medium text-darkBlue">30 Oct 2026</p>
                  </div>
                </div>
              </div>

              <p className="text-sm font-medium text-darkBlue mb-3">Before you continue</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-2">
                  <Shield size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-darkBlue">Application validation</p>
                    <p className="text-xs text-gray-500">Required details are checked after submission.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-darkBlue">Processing time</p>
                    <p className="text-xs text-gray-500">Expected processing time: 2-5 Business Days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Ban size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-darkBlue">Payment terms</p>
                    <p className="text-xs text-gray-500">Cancellation and refund rules may apply after payment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}