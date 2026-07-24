/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#148DDC',        // Azure Blue
        'primary-dark': '#0E6BA8',   // Darker Azure
        'primary-light': '#37B5F5', // Light Azure
        accent: '#08D8A2',          // Turquoise
        'accent-dark': '#06A87D',   // Darker Turquoise
        background: '#FFFFFF',      // Clean White
        surface: '#F8FAFC',         // Premium slate-50 (warm/clean)
        ink: '#0F172A',             // Slate-900 (almost black)
        muted: '#64748B',           // Slate-500
        divider: '#E2E8F0',         // Slate-200
        deep: '#0F172A',            // Deep slate for dark sections
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
