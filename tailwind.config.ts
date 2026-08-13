import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        background: "#FAFAFA",
        surface: "#FFFFFF",
      },
      borderRadius: {
        ios: "24px",
        card: "20px",
      },
    },
  },
  plugins: [],
};
export default config;
