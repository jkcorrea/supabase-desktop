/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Other potentialy useful plugins:
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ['forest', 'autumn'],
    logs: false,
  },
}
