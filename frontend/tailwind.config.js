/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./projects/smudgy/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        boundfox: {
          'yellow-bright': '#ffeb3b',
          yellow: '#ffc107',
          orange: '#ffa726',
        },
        smudgy: {
          'elevation-0': '#181A33',
          'elevation-1': '#1C1E39',
          'elevation-2': '#222448',
          'elevation-3': '#6368A2',
          red: '#F13752',
          white: '#FACACF',
          green: '#3AC66A',
          blue: '#3D62FF',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
