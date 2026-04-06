/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#F97316',
        success: '#16A34A',
        danger: '#DC2626',
        surface: '#F8FAFC',
        card: '#FFFFFF',
        border: '#E2E8F0',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
        modal: '12px',
        pill: '24px',
        chip: '999px',
      },
      screens: {
        sm: '375px',
        md: '430px',
      },
      boxShadow: {
        phone: '0 0 40px rgba(0,0,0,0.1)',
        card: '0 1px 4px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
