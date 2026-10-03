import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, Briefcase, Calendar, CheckCircle2, MapPin, Plane, ShieldCheck, Users, Zap } from "lucide-react";
import { submitForm } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiRepeat, FiSearch, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import TravelerDetails from "./TravelerDetail";
import { DateField, SelectField, PassengerField, SwapButton, defaultPassengers, todayISO, classOptions, searchLabelClass, searchInputClass, searchCellClass, searchButtonClass } from "../../components/search/SearchFields";
import {getVisas} from "../../api/visaApi";
import { getCountries } from "../../api/countryApi";

const visaTypes = [
  { key: "tourist", label: "Tourist Visa", icon: Plane },
  { key: "business", label: "Business & Delegation", icon: Briefcase },
  { key: "expedited", label: "Expedited / Express", icon: Zap },
];

const initialValues = {
  visaType: "tourist",
  destination: "Dubai, United Arab Emirates",
  entryCategory: "30-Day Single Entry eVisa",
  travelFrom: "2026-11-15",
  travelTo: "2026-11-30",
  travellers: "2 Travellers",
  passport: "Indian Passport",
};

const fieldClass = "mt-1 w-full bg-transparent text-[15px] font-medium text-ink outline-none";
const labelClass = "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-brown";

/* ---------- Flight search fields ---------- */
const flightTripTypes = ["One way"];
const flightClassTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const fsLabelClass = searchLabelClass;
const fsInputClass = searchInputClass;
const fsCellClass = searchCellClass;

const FlightSearchFields = ({
  show,
  setShow,
  onSearchComplete,
}) => {
  const [tripType, setTripType] = useState("One way");

  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    passengers: defaultPassengers,
    classType: "ECONOMY",
    cities: [],
  });

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingVisas, setLoadingVisas] = useState(false);

  const isRoundTrip = tripType === "Round Trip";
  const today = todayISO();

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeparture = (value) => {
    setForm((prev) => ({
      ...prev,
      departure: value,
      returnDate:
        prev.returnDate && prev.returnDate < value
          ? ""
          : prev.returnDate,
    }));
  };

  const handleSwap = () => {
    setForm((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  /* =====================================================
     FETCH VISA COUNTRIES
  ===================================================== */

  useEffect(() => {
    const fetchVisaCountries = async () => {
      try {
        setLoadingCountries(true);

        const response = await getCountries({
          page: 1,
          limit: 1000,
          status: "Active",
          visaStatus: "Yes",
        });

        let list = [];

        if (Array.isArray(response?.data)) {
          list = response.data;
        } else if (Array.isArray(response?.countries)) {
          list = response.countries;
        } else if (Array.isArray(response)) {
          list = response;
        } else if (Array.isArray(response?.data?.countries)) {
          list = response.data.countries;
        }

        const activeVisaCountries = list.filter((country) => {
          const active =
            String(country?.status || "")
              .trim()
              .toLowerCase() === "active";

          const visaAllowed =
            String(country?.allowForVisa || "")
              .trim()
              .toLowerCase() === "yes";

          return active && visaAllowed;
        });

        setCountries(activeVisaCountries);
      } catch (error) {
        console.error("Fetch Visa Countries Error:", error);
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchVisaCountries();
  }, []);

  /* =====================================================
     SEARCH VISA
  ===================================================== */

  const handleSearch = async () => {
    if (!form.from.trim()) {
      toast.error("Please select From country");
      return;
    }

    if (!form.to.trim()) {
      toast.error("Please select To country");
      return;
    }

    if (!form.departure) {
      toast.error("Please select departure date");
      return;
    }

    try {
      setLoadingVisas(true);

      const response = await getVisas({
        page: 1,
        limit: 1000,
        going_from: form.from.trim(),
        going_to: form.to.trim(),
        status: "Active",
      });

      let list = [];

      if (Array.isArray(response?.visas)) {
        list = response.visas;
      } else if (Array.isArray(response?.data)) {
        list = response.data;
      } else if (Array.isArray(response?.data?.visas)) {
        list = response.data.visas;
      } else if (Array.isArray(response)) {
        list = response;
      }

      const filteredVisas = list.filter((visa) => {
        const fromMatch =
          String(visa?.going_from || "")
            .trim()
            .toLowerCase() ===
          form.from.trim().toLowerCase();

        const toMatch =
          String(visa?.going_to || "")
            .trim()
            .toLowerCase() ===
          form.to.trim().toLowerCase();

        const activeMatch =
          String(visa?.status || "")
            .trim()
            .toLowerCase() === "active";

        return fromMatch && toMatch && activeMatch;
      });

      /*
        Destination country ki complete configuration.
        Ye TravelerDetails me fields show/required karne ke
        liye use hogi.
      */

      const countryConfig =
        countries.find(
          (country) =>
            String(country?.countryName || "")
              .trim()
              .toLowerCase() ===
            form.to.trim().toLowerCase()
        ) || null;

      onSearchComplete?.({
        visas: filteredVisas,
        countryConfig,
        goingFrom: form.from.trim(),
        goingTo: form.to.trim(),
        travelDate: form.departure,
        returnDate: form.returnDate,
      });

      setShow(true);

      if (filteredVisas.length === 0) {
        toast.error("No active visa available for this route.");
      }
    } catch (error) {
      console.error("Visa Search Error:", error);

      onSearchComplete?.({
        visas: [],
        countryConfig: null,
        goingFrom: form.from.trim(),
        goingTo: form.to.trim(),
        travelDate: form.departure,
        returnDate: form.returnDate,
      });

      setShow(true);

      toast.error(
        error?.response?.data?.message ||
          "Failed to search visa"
      );
    } finally {
      setLoadingVisas(false);
    }
  };

  return (
    <div
      className="relative z-30 rounded-2xl border border-lightBrown/20 bg-darkBlue50 p-3 text-left shadow-sm sm:p-4"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      }}
    >
      <div className="space-y-2">

        <div
          className={`grid grid-cols-1 gap-2 sm:grid-cols-2 ${
            isRoundTrip
              ? "lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto]"
              : "lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"
          }`}
        >

          {/* FROM */}

          <div className={fsCellClass}>
            <p className={fsLabelClass}>From</p>

            <input
              type="text"
              value={form.from}
              onChange={(e) =>
                handleChange("from", e.target.value)
              }
              placeholder="Country"
              className={fsInputClass}
              list="visa-country-list"
            />

            <SwapButton onClick={handleSwap} />
          </div>

          {/* TO */}

          <div className={fsCellClass}>
            <p className={fsLabelClass}>To</p>

            <input
              type="text"
              value={form.to}
              onChange={(e) =>
                handleChange("to", e.target.value)
              }
              placeholder="Country"
              className={fsInputClass}
              list="visa-country-list"
            />
          </div>

          {/* DEPART */}

          <DateField
            label="Depart"
            months={isRoundTrip ? 2 : 1}
            value={form.departure}
            min={today}
            rangeFrom={isRoundTrip ? form.departure : ""}
            rangeTo={isRoundTrip ? form.returnDate : ""}
            onChange={handleDeparture}
            placeholder="Add date"
            cellClass={fsCellClass}
            labelClass={fsLabelClass}
            valueClass="text-sm"
          />

          {/* RETURN */}

          {isRoundTrip && (
            <DateField
              label="Return"
              months={2}
              value={form.returnDate}
              min={form.departure || today}
              rangeFrom={form.departure}
              rangeTo={form.returnDate}
              onChange={(v) =>
                handleChange("returnDate", v)
              }
              align="right"
              placeholder="Add date"
              cellClass={fsCellClass}
              labelClass={fsLabelClass}
              valueClass="text-sm"
            />
          )}

          {/* PERSON */}

          <PassengerField
            label="Person"
            icon={FiUsers}
            value={form.passengers}
            onChange={(v) =>
              handleChange("passengers", v)
            }
            cellClass={fsCellClass}
            labelClass={fsLabelClass}
            valueClass="text-sm"
          />

          {/* CLASS */}

          <SelectField
            label="Class Type"
            value={form.classType}
            options={classOptions}
            onChange={(v) =>
              handleChange("classType", v)
            }
            align="right"
            cellClass={fsCellClass}
            labelClass={fsLabelClass}
            valueClass="text-sm"
          />

          {/* SEARCH */}

          <button
            type="button"
            onClick={handleSearch}
            disabled={loadingVisas}
            className={`${searchButtonClass} ${
              loadingVisas
                ? "cursor-not-allowed opacity-70"
                : ""
            }`}
          >
            <FiSearch
              size={17}
              className="text-aviationBrown"
            />

            {loadingVisas
              ? "Searching..."
              : "Search"}
          </button>

          {/* COUNTRY OPTIONS */}

          <datalist id="visa-country-list">
            {countries.map((country) => (
              <option
                key={country._id}
                value={country.countryName}
              />
            ))}
          </datalist>

        </div>
      </div>
    </div>
  );
};
const VisaCard = ({
  visa,
  countryConfig,
  travelDate,
  returnDate,
  goingFrom,
  goingTo,
  onApply,
}) => {
  const [showAllDocuments, setShowAllDocuments] = useState(false);

  const entry = visa?.entry || "—";
  const validity = visa?.validity || "—";
  const duration = visa?.duration || "—";
  const processingTime = visa?.processing_time || "—";

  const amount = visa?.amount || "—";
  const childAmount = visa?.child_amount || "—";

  const abscondingFees = visa?.absconding_fees || "—";

  const description = visa?.description || "";

  const cardTitle =
    visa?.about ||
    `${goingTo} Visa ${duration} ${entry}`;

  const documents = visa?.documents
    ? String(visa.documents)
        .split(/\s*-\s*|,\s*/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const visibleDocuments = showAllDocuments
    ? documents
    : documents.slice(0, 2);

  const remainingDocuments = Math.max(
    documents.length - 2,
    0
  );

  const handleApply = () => {
    onApply?.({
      visa,
      countryConfig,
      goingFrom:
        goingFrom ||
        visa?.going_from ||
        "",
      goingTo:
        goingTo ||
        visa?.going_to ||
        "",
      travelDate: travelDate || "",
      returnDate: returnDate || "",
    });
  };

  return (
    <div className="w-full">
      <div
        className="
          relative
          h-full
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          border-t-[4px]
          border-t-[#5665d6]
          bg-white
          p-8
          shadow-[0_12px_40px_rgba(15,23,42,0.07)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
        "
      >
        {/* TOP BADGES */}

        <div className="flex items-center gap-3">
          <span
            className="
              rounded-full
              bg-[#5665d6]/10
              px-4
              py-2
              text-[11px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-[#5665d6]
            "
          >
            VISA
          </span>

          <span
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-emerald-50
              px-4
              py-2
              text-[11px]
              font-bold
              text-emerald-600
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Active
          </span>
        </div>

        {/* ROUTE */}

        <div className="mt-7 flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-600
            "
          >
            <Plane size={20} />
          </div>

          <div className="text-[14px] font-bold uppercase tracking-[0.12em] text-slate-400">
            <span className="text-slate-500">
              {visa?.going_from || goingFrom}
            </span>

            <span className="mx-2 text-[#5665d6]">
              →
            </span>

            <span className="text-slate-500">
              {visa?.going_to || goingTo}
            </span>
          </div>
        </div>

        {/* TITLE */}

        <h2
          className="
            mt-7
            text-2xl
            font-bold
            leading-tight
            text-slate-900
            sm:text-[28px]
          "
        >
          {cardTitle}
        </h2>

        {description && (
          <p
            className="
              mt-3
              line-clamp-2
              text-sm
              leading-6
              text-slate-500
            "
          >
            {description}
          </p>
        )}

        {/* MAIN DETAILS */}

        <div
          className="
            mt-7
            grid
            grid-cols-3
            overflow-hidden
            rounded-2xl
            border
            border-slate-100
            bg-slate-50
          "
        >
          <div className="border-r border-slate-200 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Entry
            </p>

            <p className="mt-2 text-sm font-bold text-slate-800">
              {entry}
            </p>
          </div>

          <div className="border-r border-slate-200 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Validity
            </p>

            <p className="mt-2 text-sm font-bold text-slate-800">
              {validity}
            </p>
          </div>

          <div className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Adult
            </p>

            <p className="mt-2 text-lg font-bold text-[#5665d6]">
              ₹{amount}
            </p>
          </div>
        </div>

        {/* SECONDARY DETAILS */}

        <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 border-b border-t border-slate-100 py-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Duration
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              {duration}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Processing Time
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              {processingTime}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Child Amount
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              ₹{childAmount}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Absconding Fees
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              {abscondingFees}
            </p>
          </div>
        </div>

        {/* DOCUMENTS */}

        {documents.length > 0 && (
          <div className="pt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Required Documents
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {visibleDocuments.map(
                (document, index) => (
                  <span
                    key={`${document}-${index}`}
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-slate-600
                    "
                  >
                    {document}
                  </span>
                )
              )}

              {!showAllDocuments &&
                remainingDocuments > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowAllDocuments(true)
                    }
                    className="
                      rounded-xl
                      border
                      border-[#5665d6]/20
                      bg-[#5665d6]/5
                      px-3
                      py-2
                      text-xs
                      font-bold
                      text-[#5665d6]
                    "
                  >
                    +{remainingDocuments} More
                  </button>
                )}
            </div>
          </div>
        )}

        {/* APPLY */}

        <button
          type="button"
          onClick={handleApply}
          className="
            mt-7
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-[#111827]
            px-5
            py-4
            text-sm
            font-bold
            text-white
            transition-all
            duration-200
            hover:bg-[#1f2937]
          "
        >
          Apply Now
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
const VisaHero = ({ setShow, show }) => {
  const [values, setValues] =
    useState(initialValues);

  const [status, setStatus] =
    useState("idle");

  const [visaResults, setVisaResults] =
    useState([]);

  const [searchInfo, setSearchInfo] =
    useState({
      countryConfig: null,
      goingFrom: "",
      goingTo: "",
      travelDate: "",
      returnDate: "",
    });

  const [selectedVisa, setSelectedVisa] =
    useState(null);

  const travelerDetailsRef = useRef(null);

  const handleSearchComplete = ({
    visas,
    countryConfig,
    goingFrom,
    goingTo,
    travelDate,
    returnDate,
  }) => {
    setVisaResults(visas || []);

    setSearchInfo({
      countryConfig: countryConfig || null,
      goingFrom: goingFrom || "",
      goingTo: goingTo || "",
      travelDate: travelDate || "",
      returnDate: returnDate || "",
    });

    // New search hone par previous traveler form hide
    setSelectedVisa(null);
  };

  const handleApplyVisa = ({
    visa,
    countryConfig,
    goingFrom,
    goingTo,
    travelDate,
    returnDate,
  }) => {
    setSelectedVisa({
      visa,
      countryConfig,
      goingFrom,
      goingTo,
      travelDate,
      returnDate,
    });

    // Traveler details open hone ke baad neeche scroll
    setTimeout(() => {
      travelerDetailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("loading");

    try {
      await submitForm(
        "/visa/check-requirements",
        values
      );

      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative bg- pt-16 sm:pb-16 sm:pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-darkBlue via-darkBlue/95 to-darkBlue" />

        <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-8">
          <h1 className="mt-6 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Your Visa Journey{" "}
            <span className="italic text-peach">
              Starts Here
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/80">
            Fast, verified visa processing and document
            support for seamless global entry. Curated
            for international itineraries with zero
            friction.
          </p>
        </div>

        {/* SEARCH */}

        <div className="relative mx-auto max-w-[1150px] px-4 sm:mt-16 sm:px-8">
          <FlightSearchFields
            setShow={setShow}
            show={show}
            onSearchComplete={
              handleSearchComplete
            }
          />
        </div>
      </section>

      {/* =================================================
          VISA SEARCH RESULTS
      ================================================= */}

      {show && (
        <section className="bg-[#f7f8fb] px-4 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[1150px]">

            {/* RESULT HEADING */}

            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5665d6]">
                Available Visas
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Visa options for your journey
              </h2>

              {searchInfo.goingFrom &&
                searchInfo.goingTo && (
                  <p className="mt-2 text-sm text-slate-500">
                    {searchInfo.goingFrom}{" "}
                    <span className="px-1 text-[#5665d6]">
                      →
                    </span>{" "}
                    {searchInfo.goingTo}
                  </p>
                )}
            </div>

            {/* RESULTS */}

            {visaResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {visaResults.map((visa) => (
                  <VisaCard
                    key={visa._id}
                    visa={visa}
                    countryConfig={
                      searchInfo.countryConfig
                    }
                    goingFrom={
                      searchInfo.goingFrom
                    }
                    goingTo={
                      searchInfo.goingTo
                    }
                    travelDate={
                      searchInfo.travelDate
                    }
                    returnDate={
                      searchInfo.returnDate
                    }
                    onApply={handleApplyVisa}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <FiSearch
                    size={26}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-800">
                  No visa available
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  No active visa was found for this
                  route.
                </p>
              </div>
            )}

            {/* =================================================
                INLINE TRAVELER DETAILS
            ================================================= */}

            {selectedVisa && (
              <div
                ref={travelerDetailsRef}
                className="mt-12 scroll-mt-8"
              >
                <div className="mb-6 rounded-3xl border border-[#5665d6]/20 bg-white p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5665d6]">
                        Visa Application
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        Enter Traveler Details
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {selectedVisa.goingFrom}{" "}
                        <span className="px-1 text-[#5665d6]">
                          →
                        </span>{" "}
                        {selectedVisa.goingTo}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedVisa(null)
                      }
                      className="self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:self-auto"
                    >
                      Change Visa
                    </button>
                  </div>
                </div>

                <TravelerDetails
                  visa={selectedVisa.visa}
                  countryConfig={
                    selectedVisa.countryConfig
                  }
                  goingFrom={
                    selectedVisa.goingFrom
                  }
                  goingTo={
                    selectedVisa.goingTo
                  }
                  travelDate={
                    selectedVisa.travelDate
                  }
                  returnDate={
                    selectedVisa.returnDate
                  }
                />
              </div>
            )}

          </div>
        </section>
      )}
    </>
  );
};

export default VisaHero;