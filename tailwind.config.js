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
        peach: "#fde2bd",navy: "#0b1628",
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
    },
  },
  plugins: [],
}

