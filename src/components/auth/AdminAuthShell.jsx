import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, FileText, ShieldCheck, Ticket, Users } from "lucide-react";
import Logo from "../../assets/image/rayyalogo.png";

const highlights = [
  { icon: FileText, text: "Visa applications and status updates" },
  { icon: Ticket, text: "Ticket requests, airlines and airports" },
  { icon: Users, text: "Customers, agents and support tickets" },
];

/* Flight route drawn once on load: DEL -> DXB -> LHR */
const RouteArt = () => (
  <svg
    viewBox="0 0 600 640"
    className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] w-full [@media(max-height:760px)]:h-[40%]"
    fill="none"
    aria-hidden="true"
  >
    <style>{`
      .route-line { stroke-dasharray: 8 10; stroke-dashoffset: 1400; animation: route-draw 2.6s ease-out .3s forwards; }
      .route-node { opacity: 0; animation: route-pop .5s ease-out forwards; }
      @keyframes route-draw { to { stroke-dashoffset: 0; } }
      @keyframes route-pop { to { opacity: 1; } }
      @media (prefers-reduced-motion: reduce) {
        .route-line { animation: none; stroke-dashoffset: 0; }
        .route-node { animation: none; opacity: 1; }
      }
    `}</style>

    <path
      className="route-line"
      d="M70 560 C 170 400, 250 470, 320 330 S 480 150, 540 100"
      stroke="#E97D34"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {[
      { x: 70, y: 560, code: "DEL", delay: ".1s" },
      { x: 320, y: 330, code: "DXB", delay: "1.3s" },
      { x: 540, y: 100, code: "LHR", delay: "2.4s" },
    ].map((n) => (
      <g key={n.code} className="route-node" style={{ animationDelay: n.delay }}>
        <circle cx={n.x} cy={n.y} r="14" fill="#E97D34" fillOpacity=".18" />
        <circle cx={n.x} cy={n.y} r="6" fill="#E97D34" />
        <text
          x={n.x + (n.code === "LHR" ? -18 : 18)}
          y={n.y + (n.code === "LHR" ? 34 : -14)}
          textAnchor={n.code === "LHR" ? "end" : "start"}
          fill="#c5d0df"
          fontSize="15"
          fontWeight="600"
          letterSpacing="2"
        >
          {n.code}
        </text>
      </g>
    ))}

    <g className="route-node" style={{ animationDelay: "2.5s" }} transform="translate(486 38) scale(1.7)">
      <path
        d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
        fill="#fff"
      />
    </g>
  </svg>
);

export const Field = ({ label, icon: Icon, type = "text", error, hint, ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={props.name} className="mb-1 block text-[13px] font-semibold text-[#102030]">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${
              error ? "text-red-400" : "text-[#8A9AB0]"
            }`}
          />
        )}
        <input
          id={props.name}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          className={`h-11 w-full rounded-xl border bg-[#FAFBFD] pl-10 ${
            isPassword ? "pr-11" : "pr-3.5"
          } text-sm text-[#102030] outline-none transition placeholder:text-[#9AA8BA] focus:bg-white focus:ring-4 ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-[#DCE4EC] hover:border-[#C3CFDB] focus:border-[#AE4000] focus:ring-[#AE4000]/15"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8A9AB0] hover:bg-[#EEF2F6] hover:text-[#102030] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#AE4000]"
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-500">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-[#64748B]">{hint}</p>
      ) : null}
    </div>
  );
};

/**
 * Full-screen auth layout. Fits one screen on desktop (no page scroll);
 * only falls back to scrolling on very short or small screens.
 *   mode: "login" | "signup"  (drives the tab switch)
 *   wide: wider card for the longer signup form
 */
const AdminAuthShell = ({ mode, title, subtitle, wide = false, children }) => (
  <div className="grid h-dvh overflow-hidden bg-[#F3F6FA] lg:grid-cols-[0.9fr_1.1fr]">
    {/* Brand panel */}
    <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#102030] via-[#0b1628] to-[#0a1521] lg:block">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#102030] via-[#AE4000] to-[#102030]" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#AE4000]/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col px-10 py-10 xl:px-14">
        <Link
          to="/"
          className="inline-flex w-fit rounded-2xl bg-white px-4 py-2 shadow-lg shadow-black/25"
        >
          <img src={Logo} alt="Raaya Tour & Travel" className="h-11 w-auto object-contain" />
        </Link>

        <div className="mt-10 max-w-md xl:mt-14">
          <h2 className=" text-4xl font-bold leading-[1.15] text-white xl:text-[42px]">
            Every booking, visa and traveler, in one place.
          </h2>
          <ul className="mt-7 space-y-3.5">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[15px] text-[#c5d0df]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F4A468]">
                  <Icon size={17} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <RouteArt />
    </aside>

    {/* Form panel */}
    <main className="relative flex min-h-0 flex-col overflow-y-auto bg-[radial-gradient(900px_420px_at_85%_-5%,#FDF1E8,transparent)]">
      <div className="flex items-center justify-between px-5 pt-4 sm:px-8">
        <Link to="/" className="lg:hidden">
          <img src={Logo} alt="Raaya Tour & Travel" className="h-10 w-auto object-contain" />
        </Link>
        <Link
          to="/"
          className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#45607f] transition hover:bg-white hover:text-[#AE4000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#AE4000]"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-5 pb-5 pt-2 sm:px-8 [@media(max-height:700px)]:pb-3">
        <div className={`w-full ${wide ? "max-w-[620px]" : "max-w-[440px]"}`}>
          <div className="rounded-3xl border border-[#E3E9F0] bg-white p-6 shadow-[0_30px_70px_-35px_rgba(16,32,48,0.45)] sm:p-7">
            {/* Sign in / Create account switch */}
            <div className="grid grid-cols-2 rounded-xl bg-[#EEF2F7] p-1 text-sm font-semibold">
              {[
                { key: "login", to: "/admin/login", label: "Sign in" },
                { key: "signup", to: "/admin/signup", label: "Create account" },
              ].map((t) => (
                <Link
                  key={t.key}
                  to={t.to}
                  replace
                  aria-current={mode === t.key ? "page" : undefined}
                  className={`rounded-lg py-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#AE4000] ${
                    mode === t.key
                      ? "bg-white text-[#102030] shadow-sm"
                      : "text-[#64748B] hover:text-[#102030]"
                  }`}
                >
                  {t.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#102030] text-white shadow-md shadow-[#102030]/25">
                <ShieldCheck size={20} />
              </span>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold leading-tight text-[#102030]">{title}</h1>
                <p className="text-sm leading-snug text-[#64748B]">{subtitle}</p>
              </div>
            </div>

            <div className="mt-5">{children}</div>
          </div>

          <p className="mt-4 text-center text-xs text-[#7B8BA0] [@media(max-height:700px)]:hidden">
            This area is for authorised Raaya staff only.
          </p>
        </div>
      </div>
    </main>
  </div>
);

export default AdminAuthShell;