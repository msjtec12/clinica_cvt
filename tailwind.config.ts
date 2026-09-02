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
        // Verde Floresta Oficial da CVT (Logotipo, faixa inferior e títulos)
        petrol: {
          50: "#edf9f2",
          100: "#daf2e5",
          200: "#bbe4ce",
          300: "#87cfa6",
          400: "#5bb883",
          500: "#3da167",
          600: "#307f52",
          700: "#266741",
          800: "#1f5233",
          900: "#163e26", // Verde Floresta Oficial do Cartão CVT
          950: "#0c2617",
        },
        // Verde Pistache / Sálvia do Fundo e Patinha do Cartão
        turquoise: {
          50: "#f3f8f0",
          100: "#e4f1de",
          200: "#cde4c4",
          300: "#aad29b",
          400: "#8cbd7a",
          500: "#72a660", // Verde Sálvia do Cartão CVT
          600: "#5c8c4c",
          700: "#4a723d",
          800: "#3c5c32",
          900: "#314b29",
          950: "#192815",
        },
        // Amarelo Dourado / Âmbar do Telefone e Destaque do Cartão
        coral: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#d97706", // Dourado Âmbar de Contato e Destaque
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Cores semânticas dedicadas CVT
        cvt: {
          forest: "#163e26",
          sage: "#72a660",
          pistachio: "#e4f1de",
          gold: "#d97706",
          cream: "#f7faf5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(22, 62, 38, 0.06), 0 1px 2px -1px rgba(22, 62, 38, 0.06)",
        card: "0 4px 6px -1px rgba(22, 62, 38, 0.08), 0 2px 4px -2px rgba(22, 62, 38, 0.06)",
        hover: "0 10px 15px -3px rgba(22, 62, 38, 0.12), 0 4px 6px -4px rgba(22, 62, 38, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
