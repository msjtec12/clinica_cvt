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
        // Verde Esmeralda/Floresta Oficial do Flyer e Banner CVT
        petrol: {
          50: "#eaf3ec", // Fundo da caixa de aviso do flyer
          100: "#dcf8ea",
          200: "#bdf0d6",
          300: "#8ce0b4",
          400: "#56cb8e",
          500: "#2fb36e",
          600: "#22995d",
          700: "#1a804d",
          800: "#146c40",
          900: "#0f5934", // Verde Oficial do Flyer e Banner CVT
          950: "#09331e",
        },
        // Variações Suaves de Menta e Sálvia da Identidade CVT
        turquoise: {
          50: "#f2f8f4",
          100: "#eaf3ec",
          200: "#cde7d6",
          300: "#a5d4b5",
          400: "#7cbd92",
          500: "#51a26c",
          600: "#398353",
          700: "#2a6941",
          800: "#1f5434",
          900: "#0f5934",
          950: "#09331e",
        },
        // Vermelho do Coração do Slogan ("Cuidar é o nosso compromisso! ❤️")
        coral: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48", // Vermelho do coração do flyer
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        cvt: {
          green: "#0f5934",
          mint: "#eaf3ec",
          heart: "#e11d48",
          dark: "#09331e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(15, 89, 52, 0.06), 0 1px 2px -1px rgba(15, 89, 52, 0.06)",
        card: "0 4px 6px -1px rgba(15, 89, 52, 0.08), 0 2px 4px -2px rgba(15, 89, 52, 0.06)",
        hover: "0 10px 15px -3px rgba(15, 89, 52, 0.12), 0 4px 6px -4px rgba(15, 89, 52, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
