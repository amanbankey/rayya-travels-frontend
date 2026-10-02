/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },

      // starting wale 4 color h 
      colors: {
        brown: "#A13B00",
        lightBrown: "#E26325",
        darkBlue: "#1E2229",
        blue: "#0D1124" ,
        dustyRose: "#E0C0B4",
        cream: "#FFDBCD", 
        lightGray:"#EFEEEC",
         darkBlue900: "#292E36",
          darkBlue800: "#353A43",
          darkBlue700: "#41464F",
          darkBlue600: "#555A63",
          darkBlue500: "#6B7078",
          darkBlue400: "#83878E",
          darkBlue300: "#9EA2A8",
          darkBlue200: "#BFC2C7",
          darkBlue100: "#DFE1E4",
          darkBlue50:  "#F1F2F3",
          darkBlue25:  "#F8F8F9",

        aviationDarkBlue: "#1E2229",
      aviationBlue: "#0D1124",
      aviationBrown: "#A13B00",
      aviationLightBrown: "#E26325",
      aviationDustyRose: "#E0C0B4",
      aviationCream: "#FFDBCD",
      aviationLightGray: "#EFEEEC",

        paper: "#fbfaf7",
        soft: "#efe9de",
        line: "#e8e1d4",
        ink: "#2b2622",
        dark: "#2f2a26",
        sand: "#a58e6f",
        muted: "#7b7268",
        badge: "#f8e6cb",
        badgetext: "#b8792f",
         page: "#faf7f2",
        brown: "#7a5832",
        panel: "#f6f4ef",
        tier: "#efebe6",
        page: "#faf7f2",
      
        panel: "#f6f4ef",
        tier: "#efebe6",
        ivory: "#fcf9f4",
        oat: "#f5f2ed",
        mist: "#e9e6e1",
        peach: "#fde2bd",
        // Logo palette (navy + burnt orange) used by the admin panel
        navy: {
          DEFAULT: "#0b1628",
          50: "#f2f5f9", 100: "#e3e9f1", 200: "#c5d0df", 300: "#9aacc4", 400: "#6b829f",
          500: "#45607f", 600: "#2f4866", 700: "#223651", 800: "#1a2b42", 900: "#102030", 950: "#0a1521",
        },
        ember: {
          DEFAULT: "#a84000",
          50: "#fff5ed", 100: "#ffe7d4", 200: "#fbcba3", 300: "#f4a468", 400: "#e97d34",
          500: "#c9500e", 600: "#a84000", 700: "#8a3300", 800: "#6d2a06", 900: "#4f1f06",
        },
slate: "#1e2738",

        authBlue: "#0D1124",
        authDarkBlue: "#1E2229",
        authBrown: "#A13B00",
        authLightBrown: "#E26325",
        authDustyRose: "#E0C0B4",
        authCream: "#FFDBCD",
        authLightGray: "#EFEEEC",
      },
      // SignIn / SignUp popup colors (brown upar override ho raha h, isliye alag)
      boxShadow: {
        card: "0 2px 24px rgba(120, 90, 50, 0.07)",
      },
       animation: {
        "fade-in-up": "fadeInUp 0.55s ease-out both",
        fly: "flyAcross 2.6s ease-in-out infinite alternate",
        "pulse-brown": "pulseBrown 2s ease-in-out infinite",
        drift: "cloudDrift 6s linear infinite"
      },
       keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        flyAcross: {
          "0%": { left: "0%" },
          "100%": { left: "calc(100% - 16px)" }
        },
        pulseBrown: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(161,59,0,0.35)" },
          "50%": { boxShadow: "0 0 0 6px rgba(161,59,0,0)" }
        },
        cloudDrift: {
          "0%": { transform: "translateX(-10%)", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translateX(110%)", opacity: "0" }
        }
      },
    },
  },
  plugins: [],
}

