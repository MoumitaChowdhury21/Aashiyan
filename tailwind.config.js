/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        warm: {
          50: '#FEFDF8',
          100: '#FDF8EC',
          200: '#F5EFE6',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        heartbeat: 'heartbeat 1.6s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      transitionDuration: {
        600: '600ms',
      },
    },
  },
  plugins: [],
};
