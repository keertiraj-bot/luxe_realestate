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
                primary: {
                    DEFAULT: "#0F172A",
                    foreground: "#F8FAFC",
                },
                secondary: {
                    DEFAULT: "#334155",
                    foreground: "#F8FAFC",
                },
                accent: {
                    DEFAULT: "#3B82F6",
                    foreground: "#FFFFFF",
                },
                whatsapp: "#25D366",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "bounce-slow": "bounce 3s infinite",
            },
        },
    },
    plugins: [],
};
export default config;
