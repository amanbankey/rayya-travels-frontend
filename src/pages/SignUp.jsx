
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { submitForm } from "../services/api";
import logo from "../assets/image/rayyalogo.png";

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Singapore",
  "Australia",
  "Canada",
];

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  country: "",
};

const AuthSidePanel = () => (
  <div className="relative h-44 overflow-hidden rounded-2xl md:h-auto md:min-h-[620px]">
    <img
      src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80"
      alt=""
      className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-authBlue/85 via-authDarkBlue/25 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-br from-authLightBrown/25 via-transparent to-transparent" />

    <div className="relative flex h-full flex-col justify-between p-5 md:p-7">
      <div className="flex items-center justify-between">
        <img src={logo} className="w-20 h-14" />
      </div>

      <div className="space-y-4">
        <div>
          <p className="mt-2 max-w-[300px] font-serif text-lg leading-snug text-white md:text-2xl">
            Every itinerary begins with a single, unhurried conversation.
          </p>

          <span className="mt-3 block h-0.5 w-10 bg-authLightBrown" />
        </div>

        <div className="hidden rounded-xl border border-white/10 bg-authBlue/60 p-4 backdrop-blur-md md:block">
          <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-authCream">
            Concierge Direct
            <span className="h-1.5 w-1.5 rounded-full bg-authLightBrown" />
          </p>

          <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-white">
            <Phone size={13} className="text-authLightBrown" />
            +91 90288 49207
          </p>

          <p className="mt-1.5 flex items-center gap-2 text-xs text-white/70">
            <MapPin size={12} className="shrink-0 text-authLightBrown" />
            Plot 10, Sector 90, Noida • booking@raayatravels.com
          </p>
        </div>
      </div>
    </div>
  </div>
);

const SignUpModal = ({ open, onClose, onSwitchToSignIn }) => {
  const [values, setValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setStatus("idle");

    if (
      !values.fullName ||
      !values.email ||
      !values.phone ||
      !values.password ||
      !values.confirmPassword ||
      !values.country
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (values.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("loading");

    try {
      // Backend ke exact field names
      const payload = {
        fullName: values.fullName.trim(),
        identifier: values.email.trim().toLowerCase(),
        phoneNumber: values.phone.trim(),
        country: values.country.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      const response = await submitForm("/auth/signup", payload);

      // Token save
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }

      // User save
      if (response?.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      setStatus("success");
      setValues(initialValues);
    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to create account. Please try again."
      );

      setStatus("error");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-authBlue/70 p-3 backdrop-blur-md sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="grid max-h-[94vh] w-full max-w-[1000px] gap-2 overflow-y-auto rounded-3xl  p-2 shadow-2xl md:grid-cols-[1.1fr_1fr]"
      >
        <AuthSidePanel />

        <div className="relative rounded-2xl bg-white p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-authLightGray text-authDarkBlue transition-colors hover:bg-authDustyRose"
          >
            <X size={17} />
          </button>

          <div className="flex items-center gap-2 pr-12">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-authDarkBlue text-sm font-semibold text-white">
              R
            </span>

            <span className="font-serif text-lg font-medium text-authDarkBlue">
              Raaya Travels
            </span>
          </div>

          <div className="mt-5 flex gap-1 rounded-full bg-[#E5E7EB] p-1">
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="flex-1 rounded-full py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/50"
            >
              Sign In
            </button>

            <button
              type="button"
              className="flex-1 rounded-full bg-white py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue shadow-sm"
            >
              Create Account
            </button>
          </div>

          {/* <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.15em] text-authBrown">Client Portal</p> */}
          {/* <h2 className="mt-1 font-serif text-3xl font-medium text-authDarkBlue pt-4">Create your account</h2>
          <p className="mt-2 text-sm text-authDarkBlue/65">Unlock a seamless travel experience designed around you.</p> */}

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.15em] text-authBrown">
            Client Portal
          </p>

          <h2 className="mt-1 font-serif text-3xl font-medium text-authDarkBlue">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-authDarkBlue/65">
            Unlock a seamless travel experience designed around you.
          </p>


          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">

              {/* Full Name */}
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">
                  Full Name
                </span>

                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <User size={15} className="shrink-0 text-authLightBrown" />

                  <input
                    name="fullName"
                    required
                    value={values.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full min-w-0 bg-transparent text-sm text-authDarkBlue outline-none"
                  />
                </span>
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">
                  Email Address
                </span>

                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <Mail size={15} className="shrink-0 text-authLightBrown" />

                  <input
                    type="email"
                    name="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full min-w-0 bg-transparent text-sm text-authDarkBlue outline-none"
                  />
                </span>
              </label>

              {/* Phone */}
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">
                  Phone Number
                </span>

                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <Phone size={15} className="shrink-0 text-authLightBrown" />

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit number"
                    className="w-full min-w-0 bg-transparent text-sm text-authDarkBlue outline-none"
                  />
                </span>
              </label>

              {/* Password */}
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">
                  Password
                </span>

                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <Lock size={15} className="shrink-0 text-authLightBrown" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full min-w-0 bg-transparent text-sm text-authDarkBlue outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="shrink-0 text-authDarkBlue/50"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </span>
              </label>

              {/* Confirm Password */}
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">
                  Confirm Password
                </span>

                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <Lock size={15} className="shrink-0 text-authLightBrown" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full min-w-0 bg-transparent text-sm text-authDarkBlue outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="shrink-0 text-authDarkBlue/50"
                  >
                    {showConfirm ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </span>
              </label>

              {/* Country */}
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">
                  Country
                </span>

                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <Globe size={15} className="shrink-0 text-authLightBrown" />

                  <select
                    name="country"
                    required
                    value={values.country}
                    onChange={handleChange}
                    className="w-full min-w-0 bg-transparent text-sm text-authDarkBlue outline-none"
                  >
                    <option value="">Select country</option>

                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-authDarkBlue py-3.5 text-sm font-medium text-blue transition-all hover:bg-authLightBrown hover:shadow-lg disabled:opacity-60"
            >
              {status === "loading"
                ? "Creating Account..."
                : "Create Account"}

              <ArrowRight size={15} />
            </button>

            {status === "success" && (
              <p className="rounded-lg bg-authCream px-4 py-2.5 text-center text-sm font-medium text-authBrown">
                Account created successfully.
              </p>
            )}

            <p className="text-center text-sm text-authDarkBlue/65">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="font-medium text-authBrown hover:text-authLightBrown"
              >
                Sign In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SignUpModal;

