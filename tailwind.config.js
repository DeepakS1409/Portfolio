/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lab: {
          dark: '#030712',
          card: '#080d1e',
          surface: '#0f172a',
          cyan: '#00f2fe',
          teal: '#4facfe',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          neon: '#00ffcc',
          border: 'rgba(0, 242, 254, 0.2)'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
        tech: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'radar-spin': 'radarSpin 8s linear infinite',
        'scanline': 'scanline 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(0,242,254,0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 20px rgba(0,242,254,0.8))' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        radarSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
