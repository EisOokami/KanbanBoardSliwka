/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "bright-blue": "#0096FF",
                "second-black": "#090808",
                "second-gray": "#19191e",
            },
            boxShadow: {
                active: "-5px 0px 0px 0px #0096FF",
            },
            gridAutoRows: {
                "min-content": "min-content min-content 1fr",
            },
        },
    },
    plugins: [],
};
