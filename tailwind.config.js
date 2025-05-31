/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gemini: {
          bg: '#F8FAFD',
          surface: '#FFFFFF',
          primary: '#1F1F1F',
          secondary: '#626876',
          accent: '#1A73E8',
          border: '#E4E7EB',
          dark: {
            bg: '#0A0F1A',
            surface: '#111827',
            primary: '#E5EAF2',
            secondary: '#64748B',
            accent: '#3B82F6',
            border: '#1E293B',
            elevated: '#1F2937'
          }
        }
      },
      fontFamily: {
        sans: ['Google Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))',
        'dark-noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};