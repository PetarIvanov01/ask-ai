import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        width: "width",
      },
      colors: {
        "dark-gray-1": "#131617",
        "darker-gray": "#0D0F10",
        "dark-gray-2": "#121518",
        "dark-gray-3": "#0F1113",
        "dark-gray-4": "#14171A",
        "dark-gray-5": "#15181B",
        "gray-1": "#1A1E21",
        "gray-2": "#191D20",
        "gray-3": "#1B1F22",
        "gray-4": "#111416",

        "light-gray": "#f5f5f5",
        "green-primary": "#b6f09c",
        "green-dark": "#6cb16e",
        "gray-border": "#e0e0e0",
      },
    },
  },
  plugins: [],
};
export default config;
