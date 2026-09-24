/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF8F2',
        'bg-cream': '#FBF8F2',
        'cream-warm': '#F4EFE6',
        'bg-cream-warm': '#F4EFE6',
        'cream-dark': '#ECE4D6',
        'bg-cream-dark': '#ECE4D6',
        
        espresso: '#181412',
        'text-espresso': '#181412',
        'bg-espresso': '#181412',
        'espresso-light': '#2A2522',
        'espresso-muted': '#635C57',
        'text-espresso-muted': '#635C57',
        'text-espresso-faint': '#9A928B',
        
        red: '#C91D1D',
        'color-red': '#C91D1D',
        'italian-red': '#C91D1D',
        'color-red-deep': '#8E1010',
        'red-deep': '#8E1010',
        
        orange: '#E85D04',
        'color-orange': '#E85D04',
        
        lemon: '#FFB703',
        'color-lemon': '#FFB703',
        
        grapefruit: '#E05780',
        'color-grapefruit': '#E05780',
        
        peach: '#F4978E',
        'color-peach': '#F4978E',
        
        green: '#2D6A4F',
        'color-green': '#2D6A4F',

        gold: '#C5A059',
        silver: '#D1D5DB',
      },
      fontFamily: {
        serif: ['"Italiana"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        'serif-display': ['"Italiana"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        'serif-body': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        'sans-display': ['"Syne"', 'sans-serif'],
        caps: ['"Cinzel"', '"Italiana"', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(100%) scale(0.6)', opacity: '0' },
          '20%': { opacity: '0.8' },
          '80%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-120%) scale(1.2)', opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        rotateSlow: 'rotateSlow 24s linear infinite',
        bubbleRise: 'bubbleRise 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

