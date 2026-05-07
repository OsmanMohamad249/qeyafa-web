/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict Color Palette Enforcement
        'background': '#020402',
        'gold': '#C5A065',
        'deep-teal': '#115E59',
        'text-body': '#E5E7EB',

        // Legacy for compatibility (can be phased out)
        'qeyafa-primary': '#C5A065',
        'qeyafa-secondary': '#115E59',
        'qeyafa-accent': '#115E59',
        'qeyafa-gold': '#C5A065',
        'qeyafa-black': '#020402',
      },

      fontFamily: {
        'arabic': ['"IBM Plex Sans Arabic"', 'Outfit', 'system-ui', 'sans-serif'],
        'english': ['Outfit', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        'sans': ['Outfit', '"IBM Plex Sans Arabic"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Outfit', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },

      backgroundImage: {
        'grid-pattern': `
          linear-gradient(to right, rgba(17, 94, 89, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(17, 94, 89, 0.03) 1px, transparent 1px)
        `,
        'luxury-gradient': 'linear-gradient(135deg, #020402 0%, #115E59 50%, #020402 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C5A065 0%, #b8860b 50%, #C5A065 100%)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(17, 94, 89, 0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, #020402 0%, rgba(17, 94, 89, 0.2) 50%, #020402 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(17, 94, 89, 0.1) 0%, rgba(197, 160, 101, 0.05) 100%)',
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
            boxShadow: '0 0 20px rgba(17, 94, 89, 0.3), 0 0 40px rgba(197, 160, 101, 0.1)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(17, 94, 89, 0.5), 0 0 80px rgba(197, 160, 101, 0.2)'
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
        'luxury': '0 4px 30px rgba(17, 94, 89, 0.15)',
        'luxury-lg': '0 10px 50px rgba(17, 94, 89, 0.25)',
        'gold': '0 4px 30px rgba(197, 160, 101, 0.15)',
        'gold-lg': '0 10px 50px rgba(197, 160, 101, 0.25)',
        'glow': '0 0 40px rgba(17, 94, 89, 0.3)',
        'glow-gold': '0 0 40px rgba(197, 160, 101, 0.3)',
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
  plugins: [
    //
  ],
}
