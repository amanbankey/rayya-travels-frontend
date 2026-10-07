import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, Briefcase, Calendar, CheckCircle2, Clock, FileText, MapPin, Plane, ShieldCheck, Users, Zap } from "lucide-react";
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

/* =========================================================
   VISA CARD
========================================================= */

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

  const from = visa?.going_from || goingFrom || "";
  const to = visa?.going_to || goingTo || "";

  const entry = visa?.entry || "—";
  const validity = visa?.validity || "—";
  const duration = visa?.duration || "—";
  const processingTime = visa?.processing_time || "—";

  const amount = visa?.amount || "—";
  const childAmount = visa?.child_amount || "—";
  const abscondingFees = visa?.absconding_fees || "—";
  const description = visa?.description || "";

  const cardTitle =
    visa?.about || `${to} Visa ${duration} ${entry}`;

  const documents = visa?.documents
    ? String(visa.documents)
        .split(/\s*-\s*|,\s*/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const visibleDocuments = showAllDocuments
    ? documents
    : documents.slice(0, 2);

  const remainingDocuments = Math.max(documents.length - 2, 0);

  const handleApply = () => {
    onApply?.({
      visa,
      countryConfig,
      goingFrom: from,
      goingTo: to,
      travelDate: travelDate || "",
      returnDate: returnDate || "",
    });
  };

  const stats = [
    { label: "Entry", value: entry, icon: ShieldCheck },
    { label: "Validity", value: validity, icon: Calendar },
    { label: "Duration", value: duration, icon: Calendar },
    { label: "Processing", value: processingTime, icon: Clock },
  ];

  return (
    <div className="group w-full">
      <div
        className="
          relative flex h-full flex-col overflow-hidden
          rounded-2xl border border-lightBrown/25 bg-white
          shadow-[0_6px_24px_rgba(15,23,42,0.06)]
          transition-all duration-300 ease-out
          hover:-translate-y-1.5 hover:border-brown/50
          hover:shadow-[0_20px_44px_rgba(15,23,42,0.14)]
        "
      >
        {/* ================= HEADER ================= */}

        <div className="relative overflow-hidden bg-gradient-to-br from-darkBlue via-darkBlue to-darkBlue/90 px-5 pb-4 pt-4">
          {/* soft glow */}
          <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-peach/20 blur-2xl transition-all duration-500 group-hover:scale-125" />

          <div className="relative flex items-center justify-between">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-peach ring-1 ring-white/15">
              Visa
            </span>

            <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-300/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Active
            </span>
          </div>

          {/* ROUTE */}

          <div className="relative mt-4 flex items-center gap-3 text-white">
            <span className="max-w-[40%] truncate text-sm font-semibold uppercase tracking-wide">
              {from}
            </span>

            <div className="relative h-5 flex-1">
              <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-white/30" />
              <Plane
                size={16}
                className="absolute top-1/2 -translate-y-1/2 rotate-90 text-peach transition-all duration-700 ease-out left-[42%] group-hover:left-[85%]"
              />
            </div>

            <span className="max-w-[40%] truncate text-right text-sm font-semibold uppercase tracking-wide">
              {to}
            </span>
          </div>
        </div>

        {/* ================= BODY ================= */}

        <div className="flex flex-1 flex-col p-5">
          <h2 className="line-clamp-2 text-[17px] font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-brown">
            {cardTitle}
          </h2>

          {description && (
            <p className="mt-1.5 line-clamp-1 text-[13px] text-slate-500">
              {description}
            </p>
          )}

          {/* STATS */}

          <div className="mt-4 grid grid-cols-2 gap-2">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-xl bg-darkBlue50 px-3 py-2.5 transition-colors duration-300 group-hover:bg-brown/5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brown shadow-sm">
                  <Icon size={15} />
                </span>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {label}
                  </p>
                  <p className="truncate text-[13px] font-semibold text-ink">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PRICE */}

          <div className="mt-4 flex items-end justify-between rounded-xl border border-lightBrown/25 bg-gradient-to-r from-peach/20 via-white to-white px-4 py-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Adult
              </p>
              <p className="text-2xl font-bold leading-none text-brown">
                ₹{amount}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-slate-500">
                Child{" "}
                <span className="font-semibold text-ink">
                  ₹{childAmount}
                </span>
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Absconding{" "}
                <span className="font-semibold text-ink">
                  {abscondingFees}
                </span>
              </p>
            </div>
          </div>

          {/* DOCUMENTS */}

          {documents.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <FileText size={11} />
                Required documents
              </p>

              <div className="flex flex-wrap gap-1.5">
                {visibleDocuments.map((document, index) => (
                  <span
                    key={`${document}-${index}`}
                    className="rounded-lg border border-lightBrown/30 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
                  >
                    {document}
                  </span>
                ))}

                {!showAllDocuments && remainingDocuments > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAllDocuments(true)}
                    className="rounded-lg border border-brown/25 bg-brown/5 px-2.5 py-1 text-[11px] font-semibold text-brown transition hover:bg-brown hover:text-white"
                  >
                    +{remainingDocuments} more
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
              mt-5 flex w-full items-center justify-center gap-2
              rounded-xl bg-darkBlue px-5 py-3 text-sm font-semibold text-white
              transition-all duration-300
              hover:bg-brown hover:shadow-lg active:scale-[0.98]
            "
          >
            Apply Now
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
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
  const resultsRef = useRef(null);

  // Har search ke baad badhta hai, isse results par scroll trigger hota hai
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (searchCount === 0) return;

    const timer = setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [searchCount]);

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

    // Search ke baad seedha results/cards par scroll
    setSearchCount((prev) => prev + 1);
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
        <section
          ref={resultsRef}
          className="scroll-mt-4 bg-[#f7f8fb] px-4 py-12 sm:px-8 sm:py-16"
        >
          <div className="mx-auto max-w-[1150px]">

            {/* RESULT HEADING */}

            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brown">
                Available Visas
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Visa options for your journey
              </h2>

              {searchInfo.goingFrom &&
                searchInfo.goingTo && (
                  <p className="mt-2 text-sm text-slate-500">
                    {searchInfo.goingFrom}{" "}
                    <span className="px-1 text-brown">
                      →
                    </span>{" "}
                    {searchInfo.goingTo}
                  </p>
                )}
            </div>

            {/* RESULTS */}

            {visaResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="mb-6 rounded-3xl border border-brown/20 bg-white p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brown">
                        Visa Application
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        Enter Traveler Details
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {selectedVisa.goingFrom}{" "}
                        <span className="px-1 text-brown">
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