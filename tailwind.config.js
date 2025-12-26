// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        // This pattern safely scans all your code folders but ignores node_modules
        "./{src,pages,renderer}/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography'),],
};