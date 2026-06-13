import type { Config } from "tailwindcss";

// Tokens definitifs gérés en parallele dans /design (slice #3) — ne pas finaliser ici.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
