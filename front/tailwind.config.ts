import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary': '#0B0534',
      'secondary': '#382B59',
      'thirdly': '#4F3E6C',
      'fourthly': '#65517E',
      'backgroundsecondary': '#BE9CC7',
      'background': '#404040',
      'white': '#FFFFFF',
      'red': '#FF0000',
      'green': '#00FF00',
      'blue': '#0000FF',
      'yellow': '#FFFF00',
      'cyan': '#00FFFF',
      'black': '#000000',
    },
    extend: {
      inset: {
        '1/6': '5%',
        '7/10': '70%',
        '1/10': '10%',
        '5/100': '5%',
        '3/100': '3%',
      },
      padding: {
        '1/2': '50%',
      },
      margin: {
        '1/2': '50%',
        '1/4': '25%',
        '1/6': '16.666667%',
        '1/10': '10%',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(115deg, #404040 40%, #0B0534 65%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
