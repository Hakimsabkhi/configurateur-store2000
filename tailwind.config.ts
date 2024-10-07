import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        cText: 'var(--color-cText)',
        cTextH: 'var(--color-cTextH)',
        cbutton: 'var(--color-cbutton)',
        Navbutton: 'var(--color-Navbutton)',
        NavbuttonText: 'var(--color-NavbuttonText)',
        NavbuttonH: 'var(--color-NavbuttonH)',
        NavbuttonHText: 'var(--color-NavbuttonHText)',
        boxshadow: 'var(--color-boxshadow)',
      },
    },
  },
  plugins: [],
};
export default config;
