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
        'cithi-dark': '#2A002C',
        'cithi-purple': '#797798',
        'cithi-light': '#787598',
        'cithi-sidebar': '#182028',
        'cithi-chat': '#200017',
        'cithi-msg-left': '#7c7488',
        'cithi-msg-right': '#7b5d7a',
      },
      fontFamily: {
        figtree: ['var(--font-figtree)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
