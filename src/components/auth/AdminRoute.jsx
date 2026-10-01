import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getMe } from "../../api/authApi";

const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Guards admin pages. Checks the stored token with the backend (/auth/me)
 * and only lets the user in when the role is "admin".
 */
const AdminRoute = ({ children }) => {
  const [status, setStatus] = useState(() =>
    localStorage.getItem("token") ? "checking" : "denied"
  );

  useEffect(() => {
    if (status !== "checking") return;
    let cancelled = false;

    getMe()
      .then((data) => {
        if (cancelled) return;
        if (data.user?.role === "admin") {
          localStorage.setItem("user", JSON.stringify(data.user));
          setStatus("allowed");
        } else {
          clearAuth();
          setStatus("denied");
        }
      })
      .catch(() => {
        if (cancelled) return;
        clearAuth();
        setStatus("denied");
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8FB] text-[#102030]">
        <Loader2 className="animate-spin text-[#AE4000]" size={28} />
      </div>
    );
  }

  if (status === "denied") return <Navigate to="/admin/login" replace />;

  return children;
};

export default AdminRoute;
