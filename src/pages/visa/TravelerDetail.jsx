import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  Lock,
  Cloud
} from "lucide-react";

import {
  extractPassportData,
  extractPanData,
} from "../../api/documentApi";

import {
  submitVisaApplication,
} from "../../api/visaApplicationApi";

import { getMe } from "../../api/authApi";

/* =========================================================
   HELPERS
========================================================= */

// Handles common Axios + sendSuccess response structures
const pickExtracted = (response, keys) => {
  const candidates = [
    response?.data?.data?.data,
    response?.data?.data,
    response?.data,
    response,
  ];

  return (
    candidates.find(
      (item) =>
        item &&
        typeof item === "object" &&
        keys.some((key) => item[key])
    ) || {}
  );
};

const cleanName = (value) =>
  String(value || "")
    .replace(/[<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const validName = (value) =>
  value.length >= 2 && /^[A-Z][A-Z\s'-]*$/i.test(value);

const validIsoDate = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(`${value}T00:00:00`));

const parseAmount = (value) =>
  Number(String(value ?? "0").replace(/[^0-9.]/g, "")) || 0;

/* =========================================================
   INITIAL DATA
========================================================= */

const emptyTravelerData = {
  firstName: "",
  lastName: "",
  nationality: "",
  passengerType: "Adult",
  sex: "",
  dateOfBirth: "",
  passportNumber: "",
  placeOfBirth: "",
  motherName: "",
  fatherName: "",
  spouseName: "",
  travelDate: "",
  checkinPoint: "",
  checkoutPoint: ""
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

function createTraveler(id, travelDate = "") {
  return {
    id,
    data: {
      ...emptyTravelerData,
      ...emptyTravelerProfessional,
      travelDate
    },
    files: { ...emptyTravelerFiles }
  };
}

const uploadFields = [
  {
    key: "travelerPhoto",
    label: "Traveler's Photo",
    icon: Camera,
    required: true,
    note: null
  },
  {
    key: "passportFront",
    label: "Passport Front",
    icon: FileText,
    required: true,
    note: "Auto-fills passport details"
  },
  {
    key: "passportBack",
    label: "Passport Back",
    icon: FileText,
    required: true,
    note: null
  },
  {
    key: "panCard",
    label: "Traveler's PAN Card",
    icon: CreditCard,
    required: true,
    note: "Auto-fills PAN number"
  },
  {
    key: "hotelVoucher",
    label: "Hotel Voucher",
    icon: Building2,
    required: false,
    note: null
  },
  {
    key: "additionalDocument",
    label: "Additional Document",
    icon: FileText,
    required: false,
    note: null
  }
];

const steps = [
  { label: "Visa", status: "done" },
  { label: "Travelers", status: "active" },
  { label: "Submit", status: "pending" }
];

function FlightRoute({ from, to }) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-darkBlue">
      <span className="shrink-0">
        {from || "—"}
      </span>

      <div className="relative flex-1 h-5 overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />

        <Cloud
          size={10}
          className="absolute top-1 text-gray-300 animate-drift"
          style={{ animationDelay: "0s" }}
        />

        <Cloud
          size={8}
          className="absolute top-2.5 text-gray-200 animate-drift"
          style={{ animationDelay: "2s" }}
        />

        <Plane
          size={16}
          className="absolute top-1/2 -translate-y-1/2 text-brown rotate-90 animate-fly"
        />
      </div>

      <span className="shrink-0 text-right">
        {to || "—"}
      </span>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-brown" />
      </span>

      <div>
        <h3 className="font-semibold text-darkBlue">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required,
  type = "text",
  maxLength
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-darkBlue mb-1.5">
        {label}{" "}
        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full ${
            Icon ? "pl-9" : "pl-3"
          } pr-3 py-2.5 border border-gray-300 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown`}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  required,
  placeholder,
  options
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-darkBlue mb-1.5">
        {label}{" "}
        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className={`w-full ${
            Icon ? "pl-9" : "pl-3"
          } pr-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown text-gray-600`}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function TravelerCard({
  traveler,
  index,
  canDelete,
  reading,
  onFieldChange,
  onFileChange,
  onDelete
}) {
  const { id, data, files } =
    traveler;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 animate-fade-in-up transition-shadow duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between gap-3 mb-5 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center text-brown font-semibold text-sm shrink-0">
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </span>

          <div>
            <h2 className="font-semibold text-darkBlue">
              Traveler {index + 1}
            </h2>

            <p className="text-sm text-gray-500">
              Passenger information
            </p>
          </div>
        </div>

        {canDelete && (
          <button
            type="button"
            onClick={() =>
              onDelete(id)
            }
            className="flex items-center gap-1.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
          >
            <Trash2 size={16} />

            <span className="hidden sm:inline">
              Remove
            </span>
          </button>
        )}
      </div>

      <div className="space-y-6">

        {/* SMART AUTOFILL */}

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center shrink-0">
              <UploadCloud
                size={20}
                className="text-brown"
              />
            </span>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-darkBlue">
                  Smart document autofill
                </h3>

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
                <FileText
                  size={18}
                  className="text-brown mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-medium text-darkBlue text-sm">
                    Passport Front
                  </p>

                  <p className="text-xs text-gray-500">
                    Automatically fills name, passport number, nationality, gender, date of birth and place of birth.
                  </p>
                </div>
              </div>

              {files.passportFront ? (
                <Check
                  size={16}
                  className="text-green-600 shrink-0"
                />
              ) : (
                <span className="text-xs text-gray-400 shrink-0">
                  Step 1
                </span>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <CreditCard
                  size={18}
                  className="text-brown mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-medium text-darkBlue text-sm">
                    PAN Card
                  </p>

                  <p className="text-xs text-gray-500">
                    Automatically reads your PAN number from the uploaded card.
                  </p>
                </div>
              </div>

              {files.panCard ? (
                <Check
                  size={16}
                  className="text-green-600 shrink-0"
                />
              ) : (
                <span className="text-xs text-gray-400 shrink-0">
                  Step 2
                </span>
              )}
            </div>
          </div>
        </div>

        {/* DOCUMENTS */}

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading
            icon={FileText}
            title="Upload your documents"
            description="Start with your Passport Front and PAN Card. We'll automatically fill the information we can read from these documents."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadFields.map(
              (field) => {
                const Icon =
                  field.icon;

                const file =
                  files[field.key];

                const inputId = `upload-${id}-${field.key}`;

                const isReading =
                  !!reading?.[field.key];

                return (
                  <div
                    key={field.key}
                    className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-200 hover:border-brown/50 hover:bg-brown/5"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center shrink-0">
                        <Icon
                          size={18}
                          className="text-brown"
                        />
                      </span>

                      <div className="min-w-0">
                        <p className="font-medium text-darkBlue text-sm">
                          {field.label}

                          {field.required && (
                            <span className="text-red-500">
                              {" "}
                              *
                            </span>
                          )}
                        </p>

                        {isReading ? (
                          <p className="text-xs text-brown flex items-center gap-1.5">
                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-brown border-t-transparent" />
                            Reading document details...
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500 truncate">
                            {file
                              ? file.name
                              : "Click to upload a document"}
                          </p>
                        )}

                        {field.note && (
                          <p className="text-xs text-brown mt-0.5">
                            + {field.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {file && !isReading && (
                        <button
                          type="button"
                          onClick={() =>
                            onFileChange(
                              id,
                              field.key,
                              null
                            )
                          }
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove file"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}

                      <label
                        htmlFor={inputId}
                        className={`text-sm font-medium border border-gray-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 text-darkBlue ${
                          isReading
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                      >
                        {file
                          ? "Change"
                          : "Browse"}
                      </label>
                    </div>

                    <input
                      id={inputId}
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        onFileChange(
                          id,
                          field.key,
                          e.target.files?.[0] ||
                            null
                        );
                        e.target.value = "";
                      }}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* PERSONAL */}

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading
            icon={User}
            title="Personal details"
            description="Review the information filled from your passport and complete anything that is still missing."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField
              label="First Name"
              name="firstName"
              value={data.firstName}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="Enter first name"
              icon={User}
              required
            />

            <TextField
              label="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="Enter last name"
              icon={User}
              required
            />

            <SelectField
              label="Nationality"
              name="nationality"
              value={data.nationality}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              icon={Globe}
              required
              placeholder="Select nationality"
              options={[
                "Indian",
                "United Arab Emirates",
                "United States",
                "United Kingdom",
                "Canada",
                "Australia",
                "Other"
              ]}
            />

            <SelectField
              label="Passenger Type"
              name="passengerType"
              value={
                data.passengerType
              }
              onChange={(e) =>
                onFieldChange(id, e)
              }
              icon={Users}
              required
              options={[
                "Adult",
                "Child",
                "Infant"
              ]}
            />

            <SelectField
              label="Sex"
              name="sex"
              value={data.sex}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              icon={Users}
              required
              placeholder="Select gender"
              options={[
                "Male",
                "Female",
                "Other"
              ]}
            />

            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              value={data.dateOfBirth}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              icon={Calendar}
              required
              type="date"
            />
          </div>
        </div>

        {/* PASSPORT */}

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading
            icon={FileText}
            title="Passport information"
            description="Review the passport number read from your uploaded passport."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField
              label="Passport Number"
              name="passportNumber"
              value={
                data.passportNumber
              }
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="A1234567"
              icon={FileText}
              required
            />
          </div>
        </div>

        {/* FAMILY */}

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading
            icon={Heart}
            title="Family & background"
            description="Some of these details may not be available on the passport and need to be entered manually."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField
              label="Place of Birth"
              name="placeOfBirth"
              value={
                data.placeOfBirth
              }
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="Enter place of birth"
              icon={MapPin}
            />

            <TextField
              label="Mother's Name"
              name="motherName"
              value={data.motherName}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="Enter mother's name"
              icon={User}
            />

            <TextField
              label="Father's Name"
              name="fatherName"
              value={data.fatherName}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="Enter father's name"
              icon={User}
              required
            />

            <TextField
              label="Spouse's Name"
              name="spouseName"
              value={data.spouseName}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="Enter spouse's name"
              icon={User}
            />
          </div>
        </div>

        {/* TRAVEL */}

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading
            icon={Plane}
            title="Travel details"
            description="Add the travel information required for your application."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField
              label="Travel Date"
              name="travelDate"
              value={data.travelDate}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              icon={Calendar}
              required
              type="date"
            />

            <TextField
              label="Check-in Point"
              name="checkinPoint"
              value={data.checkinPoint}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="Enter check-in point"
              icon={LogIn}
              required
            />

            <TextField
              label="Check-out Point"
              name="checkoutPoint"
              value={data.checkoutPoint}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              placeholder="Enter check-out point"
              icon={LogOut}
              required
            />
          </div>
        </div>

        {/* PROFESSIONAL */}

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeading
            icon={Briefcase}
            title="Professional information"
            description="PAN number can be filled automatically from the uploaded PAN card. Occupation needs to be selected manually."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField
              label="India PAN Card Number"
              name="panNumber"
              value={data.panNumber}
              onChange={(e) =>
                onFieldChange(id, {
                  target: {
                    name: "panNumber",
                    value:
                      e.target.value.toUpperCase()
                  }
                })
              }
              placeholder="ABCDE1234F"
              icon={CreditCard}
              required
            />

            <SelectField
              label="Occupation"
              name="occupation"
              value={data.occupation}
              onChange={(e) =>
                onFieldChange(id, e)
              }
              icon={Briefcase}
              placeholder="Select occupation"
              options={[
                "Business",
                "Salaried Employee",
                "Self Employed",
                "Student",
                "Government Employee",
                "Retired",
                "Homemaker",
                "Professional",
                "Other"
              ]}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function TravelerDetails(props) {
  const routerLocation = useLocation();

  // Props first, then fall back to router state
  const state = routerLocation?.state || {};

  const visa = props.visa ?? state.visa ?? null;
  const goingFrom = props.goingFrom ?? state.goingFrom ?? "";
  const goingTo = props.goingTo ?? state.goingTo ?? "";
  const travelDate = props.travelDate ?? state.travelDate ?? "";
  const returnDate = props.returnDate ?? state.returnDate ?? "";

  const selectedVisa = visa || {};

  const actualFrom =
    goingFrom ||
    selectedVisa?.going_from ||
    "India";

  const actualTo =
    goingTo ||
    selectedVisa?.going_to ||
    "United Arab Emirates";

  const visaTitle =
    selectedVisa?.about ||
    `${actualTo} Visa ${
      selectedVisa?.duration || ""
    } ${
      selectedVisa?.entry || ""
    }`.trim();

  const visaEntry =
    selectedVisa?.entry ||
    "—";

  const visaDuration =
    selectedVisa?.duration ||
    "—";

  const visaProcessing =
    selectedVisa?.processing_time ||
    "—";

  const adultAmount =
    parseAmount(selectedVisa?.amount);

  const childAmount =
    parseAmount(selectedVisa?.child_amount) ||
    adultAmount;

  const [travelers, setTravelers] =
    useState([
      createTraveler(
        1,
        travelDate || ""
      )
    ]);

  const [nextId, setNextId] =
    useState(2);

  const [contact, setContact] =
    useState({
      email: "",
      mobile: ""
    });

  // { [travelerId]: { passportFront: true, panCard: true } }
  const [reading, setReading] =
    useState({});

  const [submitting, setSubmitting] =
    useState(false);

  const [submitMessage, setSubmitMessage] =
    useState("");

  const [travelInsurance] =
    useState(false);

  const totalPayable =
    travelers.reduce(
      (total, traveler) =>
        total +
        (traveler.data.passengerType ===
        "Child"
          ? childAmount
          : adultAmount),
      0
    );

  /* =====================================================
     UPDATE TRAVEL DATE WHEN NEW VISA IS SELECTED
  ===================================================== */

  useEffect(() => {
    if (!travelDate) {
      return;
    }

    setTravelers((prev) =>
      prev.map((traveler) => ({
        ...traveler,
        data: {
          ...traveler.data,
          travelDate
        }
      }))
    );
  }, [travelDate]);

  /* =====================================================
     AUTH - LOGGED IN USER
  ===================================================== */

  const getLoggedInUser = async () => {
    try {
      const response = await getMe();

      return (
        response?.user ||
        response?.data?.user ||
        response?.data ||
        response ||
        null
      );
    } catch (error) {
      console.error(
        "Unable to fetch logged-in user:",
        error
      );
      return null;
    }
  };

  useEffect(() => {
    const loadUserDetails = async () => {
      const user = await getLoggedInUser();

      if (!user) {
        return;
      }

      setContact({
        email:
          user?.email ||
          user?.emailAddress ||
          "",
        mobile: String(
          user?.phoneNumber ||
            user?.phone ||
            user?.mobile ||
            user?.mobileNumber ||
            ""
        )
          .replace(/\D/g, "")
          .slice(-10)
      });
    };

    loadUserDetails();
  }, []);

  /* =====================================================
     TRAVELER STATE HELPERS
  ===================================================== */

  const handleTravelerFieldChange = (
    id,
    e
  ) => {
    const {
      name,
      value
    } = e.target;

    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id
          ? {
              ...traveler,
              data: {
                ...traveler.data,
                [name]: value
              }
            }
          : traveler
      )
    );
  };

  const setTravelerFile = (
    id,
    field,
    file
  ) => {
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id
          ? {
              ...traveler,
              files: {
                ...traveler.files,
                [field]: file
              }
            }
          : traveler
      )
    );
  };

  const setReadingFlag = (
    id,
    field,
    value
  ) => {
    setReading((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value
      }
    }));
  };

  /* =====================================================
     PASSPORT UPLOAD + AUTO FILL
  ===================================================== */

  const handlePassportFront = async (
    id,
    file
  ) => {
    setReadingFlag(
      id,
      "passportFront",
      true
    );

    try {
      const response =
        await extractPassportData(file);

      console.log(
        "Passport OCR response:",
        response
      );

      const extracted = pickExtracted(
        response,
        [
          "firstName",
          "lastName",
          "passportNumber",
          "nationality"
        ]
      );

      const firstName = cleanName(
        extracted.firstName
      );

      const lastName = cleanName(
        extracted.lastName
      );

      const passportNumber = String(
        extracted.passportNumber || ""
      )
        .replace(/\s/g, "")
        .toUpperCase()
        .trim();

      const nationality = String(
        extracted.nationality || ""
      ).trim();

      const sex = String(
        extracted.sex || ""
      ).trim();

      const dateOfBirth = String(
        extracted.dateOfBirth || ""
      ).trim();

      const placeOfBirth = String(
        extracted.placeOfBirth || ""
      ).trim();

      const validFirstName =
        validName(firstName);

      const validLastName =
        validName(lastName);

      const validPassportNumber =
        /^[A-Z0-9]{6,12}$/.test(
          passportNumber
        );

      const validDob =
        validIsoDate(dateOfBirth);

      const validSex =
        sex === "Male" ||
        sex === "Female";

      if (
        !validFirstName &&
        !validLastName &&
        !validPassportNumber
      ) {
        window.alert(
          "Passport details could not be read. Please upload a clear passport biodata page with both MRZ lines visible."
        );
        return;
      }

      setTravelers((prev) =>
        prev.map((traveler) => {
          if (traveler.id !== id) {
            return traveler;
          }

          return {
            ...traveler,
            data: {
              ...traveler.data,
              ...(validFirstName
                ? { firstName }
                : {}),
              ...(validLastName
                ? { lastName }
                : {}),
              ...(validPassportNumber
                ? { passportNumber }
                : {}),
              ...(nationality
                ? { nationality }
                : {}),
              ...(validSex
                ? { sex }
                : {}),
              ...(validDob
                ? { dateOfBirth }
                : {}),
              ...(placeOfBirth
                ? { placeOfBirth }
                : {})
            }
          };
        })
      );

      if (
        !validFirstName ||
        !validLastName
      ) {
        window.alert(
          "Passport scanned, but the name could not be confidently separated. Please check the name against your passport and enter any missing part manually."
        );
      } else {
        window.alert(
          "Passport scan completed. Please verify the details against your passport."
        );
      }
    } catch (error) {
      console.error(
        "Passport extraction failed:",
        error
      );

      window.alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to read passport. Please upload a clear passport biodata page or enter details manually."
      );
    } finally {
      setReadingFlag(
        id,
        "passportFront",
        false
      );
    }
  };

  /* =====================================================
     PAN UPLOAD + AUTO FILL
  ===================================================== */

  const handlePanCard = async (
    id,
    file
  ) => {
    setReadingFlag(
      id,
      "panCard",
      true
    );

    try {
      const response =
        await extractPanData(file);

      console.log(
        "PAN OCR response:",
        response
      );

      const extracted = pickExtracted(
        response,
        [
          "panNumber",
          "firstName",
          "lastName",
          "name",
          "dateOfBirth"
        ]
      );

      const panNumber = String(
        extracted.panNumber || ""
      )
        .replace(/\s/g, "")
        .toUpperCase()
        .trim();

      const firstName = cleanName(
        extracted.firstName
      );

      const lastName = cleanName(
        extracted.lastName
      );

      const dateOfBirth = String(
        extracted.dateOfBirth || ""
      ).trim();

      if (
        !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
          panNumber
        )
      ) {
        window.alert(
          "PAN number could not be verified. Please upload a clear PAN card image or enter the PAN number manually."
        );
        return;
      }

      setTravelers((prev) =>
        prev.map((traveler) => {
          if (traveler.id !== id) {
            return traveler;
          }

          const current = traveler.data;

          return {
            ...traveler,
            data: {
              ...current,
              panNumber,

              // PAN only fills empty fields so passport data
              // is never overwritten.
              ...(validName(firstName) &&
              !current.firstName
                ? { firstName }
                : {}),
              ...(validName(lastName) &&
              !current.lastName
                ? { lastName }
                : {}),
              ...(validIsoDate(
                dateOfBirth
              ) && !current.dateOfBirth
                ? { dateOfBirth }
                : {})
            }
          };
        })
      );

      window.alert(
        "PAN scan completed. Please verify the PAN number and any details filled from the card."
      );
    } catch (error) {
      console.error(
        "PAN extraction failed:",
        error
      );

      window.alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to read PAN card. Please upload a clear image or enter details manually."
      );
    } finally {
      setReadingFlag(
        id,
        "panCard",
        false
      );
    }
  };

  /* =====================================================
     FILE CHANGE (ROUTES TO OCR WHEN NEEDED)
  ===================================================== */

  const handleTravelerFileChange = async (
    id,
    field,
    file
  ) => {
    // Remove file
    if (!file) {
      setTravelerFile(id, field, null);
      return;
    }

    // Save the selected file immediately
    setTravelerFile(id, field, file);

    if (field === "passportFront") {
      await handlePassportFront(
        id,
        file
      );
      return;
    }

    if (field === "panCard") {
      await handlePanCard(id, file);
    }
  };

  const handleAddTraveler = () => {
    setTravelers((prev) => [
      ...prev,
      createTraveler(
        nextId,
        travelDate || ""
      )
    ]);

    setNextId(
      (prev) => prev + 1
    );
  };

  const handleDeleteTraveler = (
    id
  ) => {
    setTravelers((prev) =>
      prev.length === 1
        ? prev
        : prev.filter(
            (traveler) =>
              traveler.id !== id
          )
    );
  };

  const handleContactChange = (
    e
  ) => {
    const {
      name,
      value
    } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]:
        name === "mobile"
          ? value
              .replace(/\D/g, "")
              .slice(0, 10)
          : value
    }));
  };

  /* =====================================================
     SUBMIT - VISA APPLICATION API
  ===================================================== */

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }

    const requiredTravelerFields = [
      ["firstName", "First Name"],
      ["lastName", "Last Name"],
      ["nationality", "Nationality"],
      ["sex", "Sex"],
      ["dateOfBirth", "Date of Birth"],
      ["passportNumber", "Passport Number"],
      ["fatherName", "Father's Name"],
      ["travelDate", "Travel Date"],
      ["checkinPoint", "Check-in Point"],
      ["checkoutPoint", "Check-out Point"],
      ["panNumber", "PAN Number"]
    ];

    const requiredFiles = [
      ["travelerPhoto", "Traveler's Photo"],
      ["passportFront", "Passport Front"],
      ["passportBack", "Passport Back"],
      ["panCard", "PAN Card"]
    ];

    for (
      let index = 0;
      index < travelers.length;
      index += 1
    ) {
      const traveler =
        travelers[index];

      for (const [
        key,
        label
      ] of requiredTravelerFields) {
        if (
          !String(
            traveler?.data?.[key] || ""
          ).trim()
        ) {
          window.alert(
            `Please fill ${label} for Traveler ${index + 1}.`
          );
          return;
        }
      }

      for (const [
        key,
        label
      ] of requiredFiles) {
        if (!traveler?.files?.[key]) {
          window.alert(
            `Please upload ${label} for Traveler ${index + 1}.`
          );
          return;
        }
      }
    }

    if (
      String(contact.mobile).replace(
        /\D/g,
        ""
      ).length !== 10
    ) {
      window.alert(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setSubmitting(true);
    setSubmitMessage("");

    try {
      const user =
        await getLoggedInUser();

      if (!user) {
        throw new Error(
          "Unable to get your logged-in profile. Please login again."
        );
      }

      const firstTraveler =
        travelers[0]?.data || {};

      const travelersPayload =
        travelers.map(
          (traveler) => ({
            ...traveler.data
          })
        );

      const applicationPayload = {
        applicant: {
          id:
            user?._id ||
            user?.id ||
            null,

          role:
            String(
              user?.role || ""
            ).toLowerCase() === "agent"
              ? "agent"
              : "user",

          name:
            user?.fullName ||
            user?.name ||
            `${firstTraveler.firstName || ""} ${
              firstTraveler.lastName || ""
            }`.trim(),

          email:
            contact.email ||
            user?.email ||
            "",

          phone: String(
            contact.mobile
          ).replace(/\D/g, "")
        },

        visa: selectedVisa || {},

        origin: actualFrom || "",
        destination: actualTo || "",

        travelDate:
          travelDate ||
          firstTraveler.travelDate ||
          "",

        returnDate:
          returnDate || "",

        travelers:
          travelersPayload,

        insurance:
          Boolean(travelInsurance),

        amount:
          Number(totalPayable) || 0,

        paymentStatus: "Pending",
        status: "Pending",
        adminNote: ""
      };

      const formData =
        new FormData();

      formData.append(
        "application",
        JSON.stringify(
          applicationPayload
        )
      );

      travelers.forEach(
        (traveler, index) => {
          Object.entries(
            traveler.files || {}
          ).forEach(
            ([fileKey, file]) => {
              if (file instanceof File) {
                formData.append(
                  `traveler_${index}_${fileKey}`,
                  file
                );
              }
            }
          );
        }
      );

      const result =
        await submitVisaApplication(
          formData
        );

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Unable to submit visa application."
        );
      }

      const message =
        result?.message ||
        "Visa application submitted successfully.";

      setSubmitMessage(message);
      window.alert(message);
    } catch (error) {
      console.error(
        "Visa application submission error:",
        error
      );

      window.alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to submit visa application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* BREADCRUMB */}

        <div className="flex items-center gap-1.5 text-sm mb-5 animate-fade-in-up">
          <span className="text-brown font-medium">
            Visa Application
          </span>

          <ChevronRight
            size={14}
            className="text-gray-400"
          />

          <span className="text-gray-500">
            Traveler Details
          </span>
        </div>

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6 animate-fade-in-up">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-darkBlue mb-2">
              Tell us about your travelers
            </h1>

            <p className="text-sm text-gray-500 max-w-xl">
              Upload your documents first. We'll automatically fill the information we can read, and you can review or complete the remaining details.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 w-full sm:w-72">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                Application progress
              </span>

              <span className="text-sm font-semibold text-brown">
                Step 2 of 3
              </span>
            </div>

            <div className="flex items-center">
              {steps.map(
                (step, index) => (
                  <div
                    key={
                      step.label
                    }
                    className="flex items-center flex-1 last:flex-none"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                          step.status ===
                          "done"
                            ? "bg-brown/10 text-brown"
                            : step.status ===
                              "active"
                            ? "bg-brown text-white animate-pulse-brown"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.status ===
                        "done" ? (
                          <Check size={16} />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <span
                        className={`text-xs ${
                          step.status ===
                          "active"
                            ? "text-brown font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {
                          step.label
                        }
                      </span>
                    </div>

                    {index <
                      steps.length -
                        1 && (
                      <div
                        className={`flex-1 h-px mx-2 ${
                          step.status ===
                          "done"
                            ? "bg-brown/40"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* MAIN */}

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">

          {/* PRICE SUMMARY */}

          <div className="order-1 animate-fade-in-up">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden lg:sticky lg:top-6 transition-shadow duration-300 hover:shadow-lg">

              <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-gray-100">
                <span className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center">
                  <CreditCard
                    size={20}
                    className="text-brown"
                  />
                </span>

                <div>
                  <h3 className="font-semibold text-darkBlue">
                    Price Summary
                  </h3>

                  <p className="text-xs text-gray-500">
                    {travelers.length} traveler
                    {travelers.length >
                    1
                      ? "s"
                      : ""}
                  </p>
                </div>
              </div>

              {/* ROUTE */}

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <p className="text-xs text-gray-400 tracking-wide mb-2">
                  TRAVEL ROUTE
                </p>

                <FlightRoute
                  from={actualFrom}
                  to={actualTo}
                />
              </div>

              {/* VISA */}

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <p className="text-xs text-gray-400 tracking-wide mb-2">
                  SELECTED VISA
                </p>

                <p className="text-sm font-semibold text-darkBlue">
                  {visaTitle}
                </p>
              </div>

              {/* FEE */}

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Visa fee
                  </span>

                  <span className="font-medium text-darkBlue">
                    ₹
                    {totalPayable.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </div>

              {/* TOTAL */}

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-sm">
                    Visa application fee
                  </span>

                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    For reference
                  </span>
                </div>

                <p className="text-2xl font-bold text-darkBlue">
                  ₹
                  {totalPayable.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>

              {/* APPLICATION CONTACT */}

              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <h4 className="font-medium text-darkBlue text-sm">
                    Applicant contact details
                  </h4>

                  <p className="text-xs text-gray-500">
                    These details will be saved with your visa application.
                  </p>
                </div>

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={contact.email}
                  onChange={handleContactChange}
                  placeholder="Enter your email"
                />

                <TextField
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  maxLength={10}
                  value={contact.mobile}
                  onChange={handleContactChange}
                  placeholder="Enter 10-digit mobile number"
                  required
                />

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group w-full bg-darkBlue hover:bg-darkBlue/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  {submitting
                    ? "Submitting Application..."
                    : "Submit Visa Application"}
                </button>

                {submitMessage && (
                  <p className="text-center text-sm font-medium text-green-600">
                    {submitMessage}
                  </p>
                )}

                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <Lock size={12} />
                  Your information is securely handled
                </p>
              </div>
            </div>
          </div>

          {/* TRAVELER AREA */}

          <div className="order-2 space-y-6">

            {/* REQUIREMENTS */}

            <div className="bg-brown/5 border border-brown/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3 animate-fade-in-up">
              <Shield
                size={20}
                className="text-brown mt-0.5 shrink-0"
              />

              <div>
                <h2 className="font-semibold text-darkBlue">
                  Application requirements for{" "}
                  {actualTo}
                </h2>

                <p className="text-sm text-gray-600">
                  The fields and documents below are displayed according to the requirements configured for this visa.
                </p>
              </div>
            </div>

            {/* TRAVELERS */}

            {travelers.map(
              (traveler, index) => (
                <TravelerCard
                  key={
                    traveler.id
                  }
                  traveler={
                    traveler
                  }
                  index={
                    index
                  }
                  canDelete={
                    travelers.length >
                    1
                  }
                  reading={
                    reading[
                      traveler.id
                    ]
                  }
                  onFieldChange={
                    handleTravelerFieldChange
                  }
                  onFileChange={
                    handleTravelerFileChange
                  }
                  onDelete={
                    handleDeleteTraveler
                  }
                />
              )
            )}

            {/* ADD */}

            <button
              type="button"
              onClick={
                handleAddTraveler
              }
              className="group w-full border border-dashed border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-2 text-sm font-medium text-darkBlue hover:border-brown hover:text-brown transition-all duration-300 hover:shadow-md active:scale-[0.98]"
            >
              <UserPlus
                size={18}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              Add another traveler
            </button>

            {/* VISA INFORMATION */}

            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 transition-shadow duration-300 hover:shadow-lg animate-fade-in-up">
              <SectionHeading
                icon={FileText}
                title="Visa information"
                description={
                  visaTitle
                }
              />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Entry
                  </p>

                  <p className="text-sm font-semibold text-darkBlue">
                    {visaEntry}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Duration
                  </p>

                  <p className="text-sm font-semibold text-darkBlue">
                    {visaDuration}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Processing
                  </p>

                  <p className="text-sm font-semibold text-darkBlue">
                    {visaProcessing}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Route
                  </p>

                  <FlightRoute
                    from={actualFrom}
                    to={actualTo}
                  />
                </div>
              </div>

              {/* DATES */}

              <div className="flex flex-col sm:flex-row gap-3 pb-5 mb-5 border-b border-gray-100">

                <div className="flex items-center gap-2 flex-1">
                  <Calendar
                    size={16}
                    className="text-gray-400"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Travel date
                    </p>

                    <p className="text-sm font-medium text-darkBlue">
                      {travelDate ||
                        "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <Calendar
                    size={16}
                    className="text-gray-400"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Return date
                    </p>

                    <p className="text-sm font-medium text-darkBlue">
                      {returnDate ||
                        "Not selected"}
                    </p>
                  </div>
                </div>
              </div>

              {/* BEFORE SUBMIT */}

              <p className="text-sm font-medium text-darkBlue mb-3">
                Before you submit
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="flex items-start gap-2">
                  <Shield
                    size={16}
                    className="text-gray-400 mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-sm font-medium text-darkBlue">
                      Application submission
                    </p>

                    <p className="text-xs text-gray-500">
                      Required details are checked when you submit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock
                    size={16}
                    className="text-gray-400 mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-sm font-medium text-darkBlue">
                      Processing time
                    </p>

                    <p className="text-xs text-gray-500">
                      Expected processing time:{" "}
                      {visaProcessing}.
                    </p>
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