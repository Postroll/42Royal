import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'unna': ['"Unna"', 'cursive'],
      },
      screens: {
        'xsm': '320px',
        // '2xl': '1500px'
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        peek: 'peek 1s ease-in-out infinite',
        shrink: 'shrink 0.1s ease-in-out forwards',
        shrink2: 'shrink2 0.1s ease-in-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        '1': '1px',
      },
      spacing: {
        '1/6': '16.66666%',
        '3/12': '25%',
        '1/12': '16.66666%',
      },
      height: {
        '128': '32rem',
        '192': '48rem',
        '256': '64rem',
        '1/10': '10%',
        '1/6': '16.66%',
      },
      minHeight: {
        '1/5': '20%',
        '12': '3rem',
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33%',
        '2/3': '66%',
        '40': '10rem',
      },
      colors: {
        'slate-1000': '#020606',
        'p1': "#0D0729",
        'p2': "#160E36",
        'p3': "#1E0C3E",
        'p4': "#55018C",
        'p5': "#5F3094",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        peek: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)'},
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10%)' },
        },
        shrink: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.97)'},
        },
        shrink2: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.95)'},
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

export default config
