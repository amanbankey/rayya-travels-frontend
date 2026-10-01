import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Globe, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import AdminAuthShell, { Field } from "../../components/auth/AdminAuthShell";
import { signupAdmin } from "../../api/authApi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const countries = [
  "India", "United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain",
  "United Kingdom", "United States", "Canada", "Australia", "Singapore", "Nepal", "Bangladesh", "Sri Lanka",
];

const strengthOf = (pw) => {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};
const strengthMeta = [
  { label: "Too short", color: "bg-red-400" },
  { label: "Weak", color: "bg-red-400" },
  { label: "Okay", color: "bg-amber-400" },
  { label: "Good", color: "bg-emerald-400" },
  { label: "Strong", color: "bg-emerald-500" },
];

const AdminSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (form.fullName.trim().length < 2) er.fullName = "Enter your full name";
    if (!form.email.trim()) er.email = "Enter your email address";
    else if (!emailRegex.test(form.email.trim())) er.email = "Enter a valid email address";
    const digits = form.phoneNumber.replace(/\D/g, "");
    if (!form.phoneNumber.trim()) er.phoneNumber = "Enter your phone number";
    else if (digits.length < 7 || digits.length > 15) er.phoneNumber = "Enter a valid phone number";
    if (!form.country.trim()) er.country = "Select or type your country";
    if (!form.password) er.password = "Create a password";
    else if (form.password.length < 6) er.password = "Use at least 6 characters";
    if (!form.confirmPassword) er.confirmPassword = "Re-enter your password";
    else if (form.password !== form.confirmPassword) er.confirmPassword = "Passwords do not match";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await signupAdmin({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        country: form.country.trim(),
        password: form.password,
      });

      toast.success("Admin account created. Sign in to continue.");
      // Signup does not keep you signed in: go to login with the email filled in.
      navigate("/admin/login", { replace: true, state: { email: form.email.trim() } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not create the account. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength = strengthOf(form.password);

  return (
    <AdminAuthShell
      mode="signup"
      wide
      title="Create admin account"
      subtitle="Set up your account, then sign in."
    >
      <form onSubmit={handleSubmit} noValidate className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="fullName"
          icon={User}
          autoComplete="name"
          placeholder="Your full name"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <Field
          label="Email address"
          name="email"
          type="email"
          icon={Mail}
          autoComplete="email"
          placeholder="admin@raayatravel.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Field
          label="Phone number"
          name="phoneNumber"
          type="tel"
          icon={Phone}
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={form.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
        <div>
          <Field
            label="Country"
            name="country"
            icon={Globe}
            autoComplete="country-name"
            list="admin-countries"
            placeholder="Select or type country"
            value={form.country}
            onChange={handleChange}
            error={errors.country}
          />
          <datalist id="admin-countries">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        <div>
          <Field
            label="Password"
            name="password"
            type="password"
            icon={Lock}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          {form.password && (
            <div className="mt-1.5 flex items-center gap-2" aria-live="polite">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      strength >= i ? strengthMeta[strength].color : "bg-[#E2E8F0]"
                    }`}
                  />
                ))}
              </div>
              <span className="w-14 text-right text-[11px] font-medium text-[#64748B]">
                {strengthMeta[strength].label}
              </span>
            </div>
          )}
        </div>
        <Field
          label="Confirm password"
          name="confirmPassword"
          type="password"
          icon={Lock}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-1.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#AE4000] text-sm font-bold text-white shadow-lg shadow-[#AE4000]/30 transition hover:bg-[#8C3300] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102030] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating account
            </>
          ) : (
            "Create admin account"
          )}
        </button>
      </form>
    </AdminAuthShell>
  );
};

export default AdminSignup;