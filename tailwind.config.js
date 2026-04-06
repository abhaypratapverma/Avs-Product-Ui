/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        surface: '#FFFFFF',
        background: '#F1F5F9',
        textPrimary: '#0F172A',
        textSecondary: '#64748B',
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '480px',
        'md': '768px',
      },
      maxWidth: {
        'mobile': '480px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'elevated': '0 4px 12px 0 rgba(0,0,0,0.10)',
        'bottom-nav': '0 -2px 16px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 0.5s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
