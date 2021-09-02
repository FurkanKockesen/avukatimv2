module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        avukatimKirmizi: {
          dark: '#4E1212',
          DEFAULT: '#741717',
        },
        mainColor: {
          mainGray: '#EEEEEE',
        },
      },
      fontFamily: {
        AbhayaLibre: 'Abhaya Libre, serif',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
