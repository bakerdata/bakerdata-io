/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold:       '#F5C26B',
        teal:       '#4AABB8',
        ink:        '#0f0f0f',
        'ink-mid':  '#3a3a3a',
        'ink-muted':'#888888',
        paper:      '#F7F5F0',
        'paper-warm':'#EFECE5',
        'paper-dark':'#E0DCD3',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'scroll-left': 'scrollLeft 32s linear infinite',
        'marquee':     'marquee 18s linear infinite',
        'fade-up':     'fadeUp .65s ease forwards',
      },
      keyframes: {
        scrollLeft: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
