import { useEffect, useState } from "react";
import { Globe, Send } from "lucide-react";
import { serviceOptions, travellerOptions } from "../../data/contactData";
import { submitForm } from "../../services/api";
import Reveal from "../../components/Reveal";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  destination: "",
  travelDate: "",
  travellers: "1 Adult",
  brief: "",
};

const labelClass =
  "block text-[11px] font-medium uppercase tracking-[0.1em] text-ink/80";

const fieldClass =
  "mt-2 w-full rounded-sm bg-oat px-4 py-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:ring-2 focus:ring-brown/30";

const InquiryForm = ({ service, onServiceChange }) => {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (service) {
      setValues((prev) => ({
        ...prev,
        service,
      }));
    }
  }, [service]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "service") {
      onServiceChange(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      const response = await submitForm("/contact", {
        fullName: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        service: values.service.trim(),
        destination: values.destination.trim(),
        travelDate: values.travelDate,
        travellers: values.travellers,
        brief: values.brief.trim(),
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to submit inquiry"
        );
      }

      setStatus("success");

      setMessage(
        response.message ||
          "Your message has been submitted successfully."
      );

      setValues(initialValues);
      onServiceChange("");
    } catch (error) {
      console.error("Contact form submit error:", error);

      setStatus("error");

      setMessage(
        error?.message ||
          "Unable to send your inquiry. Please try again."
      );
    }
  };

  return (
    <Reveal delay={150}>
      <form
        onSubmit={handleSubmit}
        className="rounded-md bg-white p-6 shadow-xl sm:p-8 lg:p-10"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">
          Private Inquiry
        </p>

        <h3 className="mt-1 text-3xl text-ink">
          Send Your Travel Inquiry
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Provide your travel details below and our concierge desk will
          construct your personalized briefing.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Full Name *</span>

            <input
              name="fullName"
              required
              value={values.fullName}
              onChange={handleChange}
              placeholder="e.g. Alistair Sterling"
              className={fieldClass}
            />
          </label>

          <label>
            <span className={labelClass}>Email Address *</span>

            <input
              type="email"
              name="email"
              required
              value={values.email}
              onChange={handleChange}
              placeholder="name@domain.com"
              className={fieldClass}
            />
          </label>

          <div>
            <span className={labelClass}>
              Phone / WhatsApp *
            </span>

            <div className="mt-2 flex gap-1">
              <span className="flex items-center rounded-sm bg-mist px-3 text-sm font-medium text-ink">
                +91
              </span>

              <input
                type="tel"
                name="phone"
                required
                value={values.phone}
                onChange={handleChange}
                placeholder="90288 49207"
                className="w-full min-w-0 rounded-sm bg-oat px-4 py-3.5 text-sm text-ink outline-none placeholder:text-ink/35 focus:ring-2 focus:ring-brown/30"
              />
            </div>
          </div>

          <label>
            <span className={labelClass}>
              Service Required *
            </span>

            <select
              name="service"
              required
              value={values.service}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="">
                Select travel requirement...
              </option>

              {serviceOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Intended Destination
            </span>

            <span className="relative block">
              <Globe
                size={15}
                className="absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-brown"
              />

              <input
                name="destination"
                value={values.destination}
                onChange={handleChange}
                placeholder="e.g. St. Moritz, Dubai, Kyoto, Maldives"
                className={`${fieldClass} pl-11`}
              />
            </span>
          </label>

          <label>
            <span className={labelClass}>
              Approximate Travel Date
            </span>

            <input
              type="date"
              name="travelDate"
              value={values.travelDate}
              onChange={handleChange}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="mt-5">
          <span className={labelClass}>
            Number of Travellers
          </span>

          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {travellerOptions.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() =>
                  setValues((prev) => ({
                    ...prev,
                    travellers: option,
                  }))
                }
                className={`rounded-sm px-2 py-3.5 text-sm font-medium transition-colors ${
                  values.travellers === option
                    ? "bg-brown text-white"
                    : "bg-oat text-ink hover:bg-mist"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-5 block">
          <span className={labelClass}>
            Specific Requirements / Itinerary Brief
          </span>

          <textarea
            name="brief"
            rows={4}
            value={values.brief}
            onChange={handleChange}
            placeholder="Detail preferred flight classes, preferred hotel aesthetics, visa appointment urgency, or special requests..."
            className={`${fieldClass} resize-none`}
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="glow-btn mt-6 flex w-full items-center justify-center gap-2.5 rounded-sm bg-darkBlue py-4 text-sm font-medium text-white transition-all hover:bg-ink hover:shadow-lg disabled:opacity-60"
        >
          {status === "loading"
            ? "Sending..."
            : "Send Travel Inquiry"}

          <Send size={15} />
        </button>

        {status === "success" && (
          <p className="mt-3 rounded-sm bg-badge px-4 py-3 text-center text-sm font-medium text-badgetext">
            {message}
          </p>
        )}

        {status === "error" && (
          <p className="mt-3 rounded-sm bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-xs text-ink/60">
          Your information is handled with utmost discretion. We
          respect your complete privacy.
        </p>
      </form>
    </Reveal>
  );
};

export default InquiryForm;