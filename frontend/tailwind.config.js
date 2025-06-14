/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          '0%': { transform: 'translate(-50%, -50%) scale(1)' },
          '14%': { transform: 'translate(-50%, -50%) scale(1.3)' },
          '28%': { transform: 'translate(-50%, -50%) scale(1)' },
          '42%': { transform: 'translate(-50%, -50%) scale(1.3)' },
          '70%': { transform: 'translate(-50%, -50%) scale(1)' },
        }
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
