import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2, Lock, Mail } from "lucide-react";
import AdminAuthShell, { Field } from "../../components/auth/AdminAuthShell";
import { signinAdmin } from "../../api/authApi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: location.state?.email || "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Already signed in as admin -> straight to dashboard
  try {
    const saved = JSON.parse(localStorage.getItem("user") || "null");
    if (localStorage.getItem("token") && saved?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  } catch {
    /* ignore corrupt storage */
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.email.trim()) er.email = "Enter your email address";
    else if (!emailRegex.test(form.email.trim())) er.email = "Enter a valid email address";
    if (!form.password) er.password = "Enter your password";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await signinAdmin({
        email: form.email.trim(),
        password: form.password,
      });

      if (data.admin?.role !== "admin") {
        toast.error("This account does not have admin access");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.admin));

      toast.success(`Welcome back, ${data.admin.fullName.split(" ")[0]}`);
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not sign in. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthShell
      mode="login"
      title="Welcome back"
      subtitle="Sign in to open the Raaya control panel."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={loading}
          className="!mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#AE4000] text-sm font-bold text-white shadow-lg shadow-[#AE4000]/30 transition hover:bg-[#8C3300] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102030] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Signing in
            </>
          ) : (
            "Sign in to dashboard"
          )}
        </button>
      </form>
    </AdminAuthShell>
  );
};

export default AdminLogin;