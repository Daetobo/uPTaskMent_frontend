/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html","./src/**/*.jsx"],
  theme: {
    extend: {
      colors:{
        'midnight': {
          '50':  '#ecf5ff',
          '100': '#dbedff',
          '200': '#bfdbff',
          '300': '#98c3ff',
          '400': '#709eff',
          '500': '#4e7aff',
          '600': '#2f52fc',
          '700': '#233fdf',
          '800': '#1f37b4',
          '900': '#22368d',
          '950': '#0a0f29',
      },
      'silver': {
        '50': '#f7f7f7',
        '100': '#ededed',
        '200': '#dfdfdf',
        '300': '#c9c9c9',
        '400': '#adadad',
        '500': '#999999',
        '600': '#888888',
        '700': '#7b7b7b',
        '800': '#676767',
        '900': '#545454',
        '950': '#363636',
    },
    
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

