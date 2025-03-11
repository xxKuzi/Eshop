/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue-hexa": "#1ca7fc",
        "brand-blue": "rgb(70,156,248)",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [daisyui],
};
