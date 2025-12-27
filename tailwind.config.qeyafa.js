/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Qeyafa Brand Identity Colors
        'qeyafa-primary': '#0F4D3F',      // Deep Green - Primary brand color
        'qeyafa-gold': '#D4A017',          // Luxury Gold - Accent color
        'qeyafa-black': '#020d0a',         // Void Background - Dark theme base

        // Extended palette for UI flexibility
        'qeyafa': {
          50: '#f0fdf8',
          100: '#ccfbea',
          200: '#9af5d6',
          300: '#5fe8bc',
          400: '#2dd39e',
          500: '#0F4D3F',                  // Primary
          600: '#0d4236',
          700: '#0a362c',
          800: '#082b23',
          900: '#05201a',
          950: '#020d0a',                  // Black variant
        },
        'gold': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#D4A017',                  // Luxury Gold
          600: '#b8860b',
          700: '#92690a',
          800: '#795810',
          900: '#654a14',
          950: '#3d2908',
        },
      },

      fontFamily: {
        // Arabic-first font stack with Tajawal
        'arabic': ['Tajawal', 'Inter', 'system-ui', 'sans-serif'],
        // English font stack with Inter
        'english': ['Inter', 'Tajawal', 'system-ui', 'sans-serif'],
        // Default sans-serif combining both
        'sans': ['Inter', 'Tajawal', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Display font for headings
        'display': ['Inter', 'Tajawal', 'system-ui', 'sans-serif'],
      },

      backgroundImage: {
        // Subtle grid pattern
        'grid-pattern': `
          linear-gradient(to right, rgba(15, 77, 63, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 77, 63, 0.03) 1px, transparent 1px)
        `,
        // Luxury gradient backgrounds
        'luxury-gradient': 'linear-gradient(135deg, #020d0a 0%, #0F4D3F 50%, #020d0a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4A017 0%, #b8860b 50%, #D4A017 100%)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(15, 77, 63, 0.15) 0%, transparent 70%)',
        // Hero section gradient
        'hero-gradient': 'linear-gradient(180deg, #020d0a 0%, rgba(15, 77, 63, 0.2) 50%, #020d0a 100%)',
        // Card hover gradient
        'card-gradient': 'linear-gradient(145deg, rgba(15, 77, 63, 0.1) 0%, rgba(212, 160, 23, 0.05) 100%)',
      },

      backgroundSize: {
        'grid': '40px 40px',
        'grid-sm': '20px 20px',
        'grid-lg': '60px 60px',
      },

      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(15, 77, 63, 0.3), 0 0 40px rgba(212, 160, 23, 0.1)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(15, 77, 63, 0.5), 0 0 80px rgba(212, 160, 23, 0.2)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      boxShadow: {
        'luxury': '0 4px 30px rgba(15, 77, 63, 0.15)',
        'luxury-lg': '0 10px 50px rgba(15, 77, 63, 0.25)',
        'gold': '0 4px 30px rgba(212, 160, 23, 0.15)',
        'gold-lg': '0 10px 50px rgba(212, 160, 23, 0.25)',
        'glow': '0 0 40px rgba(15, 77, 63, 0.3)',
        'glow-gold': '0 0 40px rgba(212, 160, 23, 0.3)',
      },

      borderRadius: {
        'luxury': '0.75rem',
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

