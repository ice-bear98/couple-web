/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "800px",
            lg: "1100px",
            xl: "1280px",
        },
        extend: {
            backgroundImage: {
                "home-image": "url(./src/assets/img/Home.jpg)",
            },
        },
    },
    plugins: [],
};
