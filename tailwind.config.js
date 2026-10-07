/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: '#0B192C',
            light: '#1E3E62',
            dark: '#060E18',
            subtle: '#152A47'
          },
          sky: {
            DEFAULT: '#0284C7',
            light: '#38BDF8',
            dark: '#0369A1',
            muted: '#E0F2FE'
          },
          turquoise: {
            DEFAULT: '#0D9488',
            light: '#14B8A6',
            dark: '#0F766E'
          },
          gold: {
            DEFAULT: '#D97706',
            light: '#F59E0B',
            dark: '#B45309',
            amber: '#FEF3C7'
          },
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            600: '#475569',
            800: '#1E293B',
            900: '#0F172A'
          }
        }
      },
      fontFamily: {
        arabic: ['Cairo', 'IBM Plex Sans Arabic', 'sans-serif'],
        sans: ['Inter', 'Cairo', 'sans-serif']
      },
      boxShadow: {
        'soft-xl': '0 20px 40px -15px rgba(11, 25, 44, 0.08)',
        'glow': '0 0 25px rgba(2, 132, 199, 0.25)',
        'gold-glow': '0 0 20px rgba(245, 158, 11, 0.3)'
      }
    },
  },
  plugins: [],
}
