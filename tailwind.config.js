import { nextui } from "@nextui-org/react";


export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "Josefin": ['Josefin Sans', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
