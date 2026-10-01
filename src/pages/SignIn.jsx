import { useState } from "react";
import {
  Apple,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plane,
  Quote,
  ShieldCheck,
  X,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { createPortal } from "react-dom";
import { submitForm } from "../services/api";
import logo from "../assets/image/rayyalogo.png"
const initialValues = { email: "", password: "", remember: false };

const AuthSidePanel = () => (
  <div className="relative h-44 overflow-hidden rounded-2xl md:h-auto md:min-h-[620px]">
    <img
      src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
      alt=""
      className="absolute inset-0 h-full w-full object-cover object-[55%_60%]"
    />
    {/* subtle brand overlay: photo stays clearly visible */}
    <div className="absolute inset-0 bg-gradient-to-t from-authBlue/85 via-authDarkBlue/25 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-br from-authLightBrown/25 via-transparent to-transparent" />

    <div className="relative flex h-full flex-col justify-between p-5 md:p-7">
      <div className="flex items-center justify-between">
        {/* <span className="flex h-9 w-9 items-center justify-center rounded-full bg-authBlue/40 text-white backdrop-blur-sm">
          <Plane size={16} />
        </span> */}
        <img src={logo} className="w-20 h-14"/>
      </div>

      <div className="space-y-4">
        <div>
          {/* <Quote size={22} className="text-authCream" /> */}
          <p className="mt-2 max-w-[300px] font-serif text-lg leading-snug text-white md:text-2xl">
            Your journey begins with thoughtful planning and quiet, unhurried execution.
          </p>
          <span className="mt-3 block h-0.5 w-10 bg-authLightBrown" />
        </div>

        <div className="hidden rounded-xl border border-white/10 bg-authBlue/60 p-4 backdrop-blur-md md:block">
          <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-authCream">
            Concierge Direct <span className="h-1.5 w-1.5 rounded-full bg-authLightBrown" />
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-white">
            <Phone size={13} className="text-authLightBrown" /> +91 90288 49207
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-xs text-white/70">
            <MapPin size={12} className="shrink-0 text-authLightBrown" /> Plot 10, Sector 90, Noida • booking@raayatravels.com
          </p>
        </div>
      </div>
    </div>
  </div>
);

const SignInModal = ({ open, onClose, onSwitchToSignUp }) => {
  const [mode, setMode] = useState("signin");
  const [values, setValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await submitForm("/auth/signin", values);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await submitForm("/auth/send-otp", { phone });
      setOtpSent(true);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await submitForm("/auth/verify-otp", { phone, otp });
      setStatus("success");
    } catch (error) {
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
        className="grid max-h-[94vh] w-full max-w-[1000px] gap-2 overflow-y-auto rounded-3xl bg-darkBlue p-2 shadow-2xl md:grid-cols-[1.1fr_1fr]"
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

          <div className="flex items-center justify-between gap-3 pr-12">
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-authDarkBlue text-sm font-semibold text-white">
                R
              </span>
              <span className="font-serif text-lg font-medium text-authDarkBlue">Raaya Travels</span>
            </span>
          </div>

          <div className="mt-5 flex gap-1 rounded-full bg-[#E5E7EB] p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-full py-2 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors ${
                mode === "signin" ? "bg-white text-authDarkBlue shadow-sm" : "text-authDarkBlue/50"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="flex-1 rounded-full py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/50"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode("otp")}
              className={`flex-1 rounded-full py-2 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors ${
                mode === "otp" ? "bg-white text-authDarkBlue shadow-sm" : "text-authDarkBlue/50"
              }`}
            >
              OTP
            </button>
          </div>

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.15em] text-authBrown">Client Portal</p>
          <h2 className="mt-1 font-serif text-3xl font-medium text-authDarkBlue">
            {mode === "otp" ? "Sign In with OTP" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-sm text-authDarkBlue/65">Access your itineraries, booking vouchers, and priority services.</p>

          {mode === "signin" ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">
                  Email Address or Mobile
                </span>
                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <Mail size={15} className="shrink-0 text-authLightBrown" />
                  <input
                    type="text"
                    name="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder="anand.g@raaya.com"
                    className="w-full bg-transparent text-sm text-authDarkBlue outline-none"
                  />
                </span>
              </label>

              <label className="block">
                <span className="flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">Password</span>
                  <button type="button" className="text-[11px] font-medium text-authBrown hover:text-authLightBrown">
                    Forgot Password?
                  </button>
                </span>
                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <Lock size={15} className="shrink-0 text-authLightBrown" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm text-authDarkBlue outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="shrink-0 text-authDarkBlue/50">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </span>
              </label>

              <label className="flex items-center gap-2 text-sm text-authDarkBlue/75">
                <input
                  type="checkbox"
                  name="remember"
                  checked={values.remember}
                  onChange={handleChange}
                  className="h-4 w-4 accent-authBrown"
                />
                Remember on this trusted device
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-authDarkBlue py-3.5 text-sm font-medium text-white transition-all hover:bg-authLightBrown hover:shadow-lg disabled:opacity-60"
              >
                {status === "loading" ? "Signing In..." : "Sign In to Raaya"} <ArrowRight size={15} />
              </button>

              {status === "success" && (
                <p className="rounded-lg bg-authCream px-4 py-2.5 text-center text-sm font-medium text-authBrown">
                  Signed in successfully.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-700">
                  Invalid credentials. Please try again.
                </p>
              )}

              

              {/* <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] py-3 text-sm font-medium text-authDarkBlue transition-colors hover:bg-authDustyRose"
                >
                  <FaGoogle size={16} /> Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] py-3 text-sm font-medium text-authDarkBlue transition-colors hover:bg-authDustyRose"
                >
                  <Apple size={16} /> Apple ID
                </button>
              </div> */}

              
            </form>
          ) : (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">Mobile Number</span>
                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] px-3.5 py-3 transition-colors focus-within:border-authLightBrown focus-within:bg-white">
                  <Phone size={15} className="shrink-0 text-authLightBrown" />
                  <input
                    type="tel"
                    required
                    disabled={otpSent}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="90288 49207"
                    className="w-full bg-transparent text-sm text-authDarkBlue outline-none disabled:opacity-60"
                  />
                </span>
              </label>

              {otpSent && (
                <label className="block">
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-authDarkBlue/70">Enter OTP</span>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    placeholder="6-digit code"
                    className="mt-1.5 w-full rounded-lg border border-[#D1D5DB] bg-[#E5E7EB] transition-colors focus:border-authLightBrown focus:bg-white px-3.5 py-3 text-center text-lg font-medium tracking-[0.3em] text-authDarkBlue outline-none"
                  />
                </label>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-authDarkBlue py-3.5 text-sm font-medium text-white transition-all hover:bg-authLightBrown hover:shadow-lg disabled:opacity-60"
              >
                {status === "loading" ? "Please wait..." : otpSent ? "Verify & Sign In" : "Send OTP"} <ArrowRight size={15} />
              </button>

              {status === "success" && (
                <p className="rounded-lg bg-authCream px-4 py-2.5 text-center text-sm font-medium text-authBrown">
                  Verified successfully.
                </p>
              )}
            </form>
          )}

           
        </div>

      </div>
    </div>,
    document.body,
  );
};

export default SignInModal;