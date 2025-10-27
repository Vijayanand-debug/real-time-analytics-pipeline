import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            mdl: '900px',
            lg: '1024px',
            xl: '1280px',
        },
    },
    plugins: [],
};

export default config;