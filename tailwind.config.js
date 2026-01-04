/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb' },
                primary: "#3b82f6",
                "primary-dark": "#2563eb",
                "background-light": "#f3f4f6",
                "background-dark": "#111827",
                "surface-light": "#ffffff",
                "surface-dark": "#1f2937",
                "border-light": "#e5e7eb",
                "border-dark": "#374151",
                "text-main-light": "#1f2937",
                "text-main-dark": "#f9fafb",
                "text-sub-light": "#6b7280",
                "text-sub-dark": "#9ca3af",
            },
            fontFamily: {
                display: ["'Inter'", "'Noto Sans SC'", "sans-serif"],
                body: ["'Inter'", "'Noto Sans SC'", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.375rem",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
