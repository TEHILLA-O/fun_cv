/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pixel: {
          brown: '#8B7355',
          darkBrown: '#5D4037',
          green: '#00FF9D',
          blue: '#00BFFF',
          purple: '#BA68C8',
          pink: '#FF69B4',
          gold: '#FFD700',
          black: '#1E1E1E'
        },
        modern: {
          dark: '#121212',
          darker: '#0A0A0A',
          purple: '#6A26CD',
          blue: '#3B82F6',
          teal: '#14B8A6',
          orange: '#F97316'
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        modern: ['"Inter"', 'sans-serif']
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 2s infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        shine: 'shine 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
        'pixel-hover': '2px 2px 0px 0px rgba(0, 0, 0, 0.2)',
        'neon': '0 0 5px theme("colors.pixel.green"), 0 0 20px theme("colors.pixel.green")'
      }
    },
  },
  plugins: [],
};