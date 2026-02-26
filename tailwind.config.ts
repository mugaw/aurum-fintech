import type { Config } from 'tailwindcss'

const config: Config = {
 content: [
   './pages/**/*.{js,ts,jsx,tsx,mdx}',
   './components/**/*.{js,ts,jsx,tsx,mdx}',
   './app/**/*.{js,ts,jsx,tsx,mdx}',
 ],
 theme: {
   extend: {
     colors: {
       gold: {
         50: '#fdf9f0',
         100: '#fbf0d9',
         200: '#f6e0b3',
         300: '#edc67a',
         400: '#e3a947',
         500: '#d4902a',
         600: '#b87620',
         700: '#945c1d',
         800: '#7a4d1e',
         900: '#653f1b',
         950: '#3b220d',
       },
       dark: {
         50: '#f6f6f7',
         100: '#e1e1e4',
         200: '#c2c2c8',
         300: '#9d9da6',
         400: '#787884',
         500: '#5c5c68',
         600: '#484851',
         700: '#3c3c43',
         800: '#313136',
         900: '#1a1a1c',
         950: '#0a0a0b',
       }
     },
     backgroundImage: {
       'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
       'gold-gradient': 'linear-gradient(135deg, #d4902a 0%, #f6e0b3 50%, #b87620 100%)',
       'dark-gradient': 'linear-gradient(180deg, #0a0a0b 0%, #1a1a1c 100%)',
     },
     animation: {
       'shimmer': 'shimmer 2s linear infinite',
       'float': 'float 6s ease-in-out infinite',
       'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
     },
     keyframes: {
       shimmer: {
         '0%': { backgroundPosition: '-1000px 0' },
         '100%': { backgroundPosition: '1000px 0' },
       },
       float: {
         '0%, 100%': { transform: 'translateY(0)' },
         '50%': { transform: 'translateY(-20px)' },
       }
     }
   },
 },
 plugins: [],
}
export default config
